import { world, system, Player, ItemStack, Block } from "@minecraft/server";
import { log } from "./lib/Util";

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

        //DPを取得
        const oldRawList = player.getDynamicProperty(`sidebar.${objectiveId}`) ?? `[]`;
        const list = JSON.parse(oldRawList);

        //追加済みかどうか
        const index = list.map(d => d.text).indexOf(text);
        if(index != -1) {
            //削除
            list.splice(index, 1);
        }

        list.push({ text:text, score:score });

        //DPに保存
        const newRawList = JSON.stringify(list);
        player.setDynamicProperty(`sidebar.${objectiveId}`, newRawList);

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

        //DPを取得
        const oldRawList = player.getDynamicProperty(`sidebar.${objectiveId}`) ?? `[]`;
        const list = JSON.parse(oldRawList);

        //list内を検索 & 削除
        const index = list.map(d => d.text).indexOf(text);
        if(index == -1)return 2;
        list.splice(index, 1);

        //DPに保存
        const newRawList = JSON.stringify(list);
        player.setDynamicProperty(`sidebar.${objectiveId}`, newRawList);
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
        player.setDynamicProperty(`sidebar.${objectiveId}`);
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
        
        //DPを取得
        const oldRawList = player.getDynamicProperty(`sidebar.${objectiveId}`) ?? `[]`;
        const list = JSON.parse(oldRawList);

        //追加済みかどうか
        const index = list.map(d => d.text).indexOf(baseText);
        if(index != -1) {
            //削除
            list.splice(index, 1);
        }
        list.push({ text:baseText, score:score });

        //DPに保存
        const newRawList = JSON.stringify(list);
        player.setDynamicProperty(`sidebar.${objectiveId}`, newRawList);
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

        //DPを取得
        const oldRawList = player.getDynamicProperty(`sidebar.${objectiveId}`) ?? `[]`;
        const list = JSON.parse(oldRawList);

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

        //DPに保存
        const newRawList = JSON.stringify(list);
        player.setDynamicProperty(`sidebar.${objectiveId}`, newRawList);
    };

    /**
     * Show
     * @param {Player} player 
     * @param {string} objectiveId 
     */
    static show(player, objectiveId = undefined) {
        if(!objectiveId) {
            player.setDynamicProperty(`sidebarSHow`);
            return -1;
        }

        const objective = world.scoreboard.getObjective(objectiveId);
        if(!objective)return 1;

        player.setDynamicProperty(`sidebarSHow`, objectiveId);
    };

    

    

    static setDisplayName(player, objectiveId, displayName) {
        const objective = world.scoreboard.getObjective(objectiveId);
        if(!objective)return 1;

        player.setDynamicProperty(`sidebar.${objectiveId}.display`, displayName);
    }

    static getDisplayName(player, objectiveId) {
        const objective = world.scoreboard.getObjective(objectiveId);
        if(!objective)return;

        return `§r` + (player.getDynamicProperty(`sidebar.${objectiveId}.display`) ?? objective.displayName);
    }



    static getShowObjectiveId(player) {
        return player.getDynamicProperty(`sidebarSHow`);
    };



    static setSort(sortType) {
        if(sortType != "ascending" && sortType != "descending")return 1;

        world.setDynamicProperty(`sidebarSortType`, sortType);
    }

    static getSortType() {
        return world.getDynamicProperty(`sidebarSortType`) ?? `ascending`;
    }

}