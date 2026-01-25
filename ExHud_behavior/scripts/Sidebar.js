import { world, system, Player, ItemStack, Block } from "@minecraft/server";
import { log } from "./lib/Util";
import { playerDB, worldDB } from "./main";

export class Sidebar {
    /**
     * Set
     * @param {Player} player 
     * @param {string} objectiveId 
     * @param {string} text 
     * @param {number} score 
     */
    static set(player, objectiveId, text, score) {
        const objective = world.scoreboard.getObjective(objectiveId);
        if(!objective)return 1;

        //DBを取得
        const list = playerDB.get(player, `sidebar.${objectiveId}`) ?? [];

        //追加済みかどうか
        const index = list.map(d => d.text).indexOf(text);
        if(index != -1) {
            //削除
            list.splice(index, 1);
        }

        list.push({ text:text, score:score });

        //DBに保存
        playerDB.set(player, `sidebar.${objectiveId}`, list)

        return 0;
    };

    /**
     * Reset 
     * @param {Player} player 
     * @param {string} objectiveId 
     * @param {string} text 
     */
    static reset(player, objectiveId, text) {
        const objective = world.scoreboard.getObjective(objectiveId);
        if(!objective)return 1;

        //DBを取得
        const list = playerDB.get(player, `sidebar.${objectiveId}`) ?? [];

        //list内を検索 & 削除
        const index = list.map(d => d.text).indexOf(text);
        if(index == -1)return 2;
        list.splice(index, 1);

        //DBに保存
        playerDB.set(player, `sidebar.${objectiveId}`, list);
    };

    /**
     * Reset All
     * @param {Player} player 
     * @param {string} objectiveId 
     */
    static resetAll(player, objectiveId) {
        const objective = world.scoreboard.getObjective(objectiveId);
        if(!objective)return 1;

        //削除
        playerDB.delete(player, `sidebar.${objectiveId}`);
    };

    /**
     * Set Ref
     * @param {Player} player 
     * @param {string} objectiveId 
     * @param {string} baseText 
     */
    static setRef(player, objectiveId, baseText) {
        const objective = world.scoreboard.getObjective(objectiveId);
        if(!objective)return 1;

        let score;
        try{
            score = objective.getScore(baseText);
        }catch(e) {
            if(score == undefined)return 2;
        };
        
        //DBを取得
        const list = playerDB.get(player, `sidebar.${objectiveId}`) ?? [];

        //追加済みかどうか
        const index = list.map(d => d.text).indexOf(baseText);
        if(index != -1) {
            //削除
            list.splice(index, 1);
        }
        list.push({ text:baseText, score:score });

        //DBに保存
        playerDB.set(player, `sidebar.${objectiveId}`, list);
    };

    /**
     * Set Ref
     * @param {Player} player 
     * @param {string} objectiveId 
     * @param {string} baseText 
     */
    static setRefAll(player, objectiveId) {
        const objective = world.scoreboard.getObjective(objectiveId);
        if(!objective)return 1;

        //DBを取得
        const list = playerDB.get(player, `sidebar.${objectiveId}`) ?? [];

        for(const scoreInfo of objective.getScores()) {
            const text = scoreInfo.participant.displayName;
            const score = scoreInfo.score;

            //追加済みかどうか
            const index = list.map(d => d.text).indexOf(text);
            if(index != -1) {
                //削除
                list.splice(index, 1);
            }
            list.push({ text:text, score:score });
        };

        //DBに保存
        playerDB.set(player, `sidebar.${objectiveId}`, list);
    };
 

    static setDisplayName(player, objectiveId, displayName) {
        const objective = world.scoreboard.getObjective(objectiveId);
        if(!objective)return 1;

        playerDB.set(player, `sidebar.${objectiveId}.display`, displayName);
    }

    static getDisplayName(player, objectiveId) {
        const objective = world.scoreboard.getObjective(objectiveId);
        if(!objective)return;

        return `§r` + (playerDB.get(player, `sidebar.${objectiveId}.display`) ?? objective.displayName);
    }


    static setShow(player, objectiveId = undefined) {
        if(!objectiveId) {
            playerDB.delete(player, `sidebarShow`);
            return -1;
        }

        const objective = world.scoreboard.getObjective(objectiveId);
        if(!objective)return 1;

        playerDB.set(player, `sidebarShow`, objectiveId);
    };

    static getShow(player) {
        return playerDB.get(player, `sidebarShow`);
    };


    static setSort(sortType) {
        if(sortType != "ascending" && sortType != "descending")return 1;

        worldDB.set(`sidebarSortType`, sortType);
    }

    static getSortType() {
        return worldDB.get(`sidebarSortType`) ?? `ascending`;
    }

}