import { world, system, Player, ItemStack, Block } from "@minecraft/server";
import { log } from "./lib/Util";
import { Actionbar } from "./Actionbar";
import { Sidebar } from "./Sidebar";

const SPLIT_TXT = ":/1/:";

export class ExHud {
    /**
     * 常時実行
     */
    static loop() {
        for(const player of world.getPlayers()) {
            //アクションバーのstayDurationチェック
            Actionbar.loop(player);

            const actionbarText = ExHud.getActionbarText(player);
            const sidebarText = ExHud.getSidebarText(player);
            if(!actionbarText && !sidebarText)continue;
            
            player.onScreenDisplay.setActionBar(actionbarText + SPLIT_TXT + sidebarText);
        };
    }

    /**
     * アクションバーに表示するテキストを取得
     */
    static getActionbarText(player) {
        const rawData = player.getDynamicProperty(`actionbar`);
        if(!rawData)return `§r`;

        const data = JSON.parse(rawData);
        const text = data.text;

        return `§r` + text;
    }

    /**
     * サイドバーに表示するテキストを取得
     */
    static getSidebarText(player) {
        const showObjectiveId = Sidebar.getShowObjectiveId(player);
        if(!showObjectiveId)return ``;

        //オブジェクトが存在しているか
        const objective = world.scoreboard.getObjective(showObjectiveId);
        if(!objective)return ``;

        //オブジェクト名を取得
        const objectiveName = Sidebar.getDisplayName(player, showObjectiveId);

        const rawData = player.getDynamicProperty(`sidebar.${showObjectiveId}`);
        if(!rawData)return ``;

        const list = JSON.parse(rawData);
        if(list.length == 0)return ``;

        //並び替え
        ExHud.sort(list);

        let texts = `§r`;
        let scores = `§r`;

        for(const scoreInfo of list) {
            texts += `\n§r${scoreInfo.text}`;
            scores += `\n§r${scoreInfo.score}`;
        };

        return texts + SPLIT_TXT + scores + SPLIT_TXT + objectiveName;

    }

    static sort(list) {
        const sortType = Sidebar.getSortType();

        if(sortType == "ascending")list.sort((a, b) => b.score - a.score);
        else list.sort((a, b) => a.score - b.score);
    }
    
};

system.runInterval(() => {
    ExHud.loop();
});