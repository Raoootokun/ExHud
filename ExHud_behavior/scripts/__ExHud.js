import { world, system, Player, ItemStack, Block } from "@minecraft/server";
import { log } from "./lib/Util";
import { Actionbar } from "./Actionbar";
import { Sidebar } from "./Sidebar";
import { playerDB } from "./main";

const SPLIT_TXT = ":/1/:";

export class __ExHud {
    /**
     * 常時実行
     */
    static loop() {
        for(const player of world.getPlayers()) {
            //アクションバーのstayDurationチェック
            Actionbar.loop(player);

            const actionbarText = __ExHud.getActionbarText(player);
            const sidebarText = __ExHud.getSidebarText(player);
            if(!actionbarText && !sidebarText)continue;

            player.onScreenDisplay.setActionBar(actionbarText + SPLIT_TXT + sidebarText);
        };
    }

    /**
     * アクションバーに表示するテキストを取得
     */
    static getActionbarText(player) {
        const data = playerDB.get(player, `actionbar`);
        if(!data)return `§r`;

        const text = data.text;

        return `§r` + text;
    }

    /**
     * サイドバーに表示するテキストを取得
     */
    static getSidebarText(player) {
        const showObjectiveId = Sidebar.getShow(player);
        if(!showObjectiveId)return ``;

        //オブジェクトが存在しているか
        const objective = world.scoreboard.getObjective(showObjectiveId);
        if(!objective)return ``;

        //オブジェクト名を取得
        const objectiveName = Sidebar.getDisplayName(player, showObjectiveId);

        const list = playerDB.get(player, `sidebar.${showObjectiveId}`) ?? [];
        if(list.length == 0)return ``;

        //並び替え
        __ExHud.sort(list);

        let texts = `§r${objectiveName}`;

        for(const scoreInfo of list) {
            texts += `\n§r${scoreInfo.text} §c${scoreInfo.score}`;
        };

        return texts;

    }

    /**
     * スコアをsortType純に並びかえ
     */
    static sort(list) {
        const sortType = Sidebar.getSortType();

        if(sortType == "ascending")list.sort((a, b) => b.score - a.score);
        else list.sort((a, b) => a.score - b.score);

        if(list.length > 20) {
            for(let i=list.length; i>20; i--) {
                list.splice(list.length-1, 1);
            }
        }
    }
    
};

system.runInterval(() => {
    __ExHud.loop();
});