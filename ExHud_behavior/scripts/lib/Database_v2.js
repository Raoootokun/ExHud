import { world, system, } from "@minecraft/server";
import { log, Util } from "./Util";
import { WorldLoad } from "./WorldLoad";

const WORLD_DB_FIREX = "wdb";
const PLAYER_DB_FIREX = "pdb";

class WorldDatabase_v2 {
    static #map = new Map();

    #rawId;
    #id;

    /**
     * @param {string} id 
     */
    constructor(id) {
        this.#rawId = id;
        this.#id = WORLD_DB_FIREX + ":" + id;
    }

    /**
     * @param {string} key 
     * @param {string | number | object} value 
     */
    set(key, value) {
        const processKey = this.#id + ":" + key;

        const saveRes = this.#save(processKey, value);
        if(!saveRes)return false;

        WorldDatabase_v2.#map.set(processKey, value);
        return true;
    };

    /**
     * @param {string} key 
     * @returns {string | number | object | undefined}
     */
    get(key) {
        const processKey = this.#id + ":" + key;
        return WorldDatabase_v2.#map.get(processKey);
    };

    /**
     * @param {string} key 
     * @returns {boolean}
     */
    has(key) {
        const processKey = this.#id + ":" + key;
        return WorldDatabase_v2.#map.has(processKey);
    };

    /**
     * @param {string} key 
     */
    delete(key) {
        const processKey = this.#id + ":" + key;
        WorldDatabase_v2.#map.delete(processKey);

        this.#save(processKey, undefined);
    }

    /**
     * @returns {string[]}
     */
    keys() {
        const prefix = this.#id + ":";

        return Array.from(WorldDatabase_v2.#map.keys())
        .filter(key => key.startsWith(prefix))
        .map(key => key.slice(prefix.length));
    };

    /**
     * @returns {any[]}
     */
    values() {
        const keys = this.keys();

        return keys.map(key => this.get(key));
    }

    /**
     * @returns {{ key:string, value:any }[]}
     */
    entreis() {
        const arr = [];
        const keys = this.keys();

        for(const key of keys) {
            const value = this.get(key);
            arr.push({ key:key, value:value });
        }

        return arr;
    }



    #save(processKey, value) {
        if(value === undefined) {
            world.setDynamicProperty(processKey);
            return true;
        }

        try{
            const strValue = JSON.stringify(value);
            world.setDynamicProperty(processKey, strValue);

            return true;
        }catch(e) {
            console.error("[WorldDatabase_v2] DP save failed:", e);

            return false;
        };
    }

    static load() {
        for(const dpKey of world.getDynamicPropertyIds().filter(id => id.startsWith(WORLD_DB_FIREX))) {
            const strValue = world.getDynamicProperty(dpKey);
            if(strValue == undefined)continue;

            const value = JSON.parse(strValue);

            WorldDatabase_v2.#map.set(dpKey, value);
        }
    };
};


























WorldLoad.subscribe(ev => {
    WorldDatabase_v2.load();
});
