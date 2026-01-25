import { world, system, Player, ItemStack, Block } from "@minecraft/server";
import { playerDB } from "./main";

export class Actionbar {

    /**
     * Set
     * @param {Player} player 
     * @param {string} text 
     * @param {number} stayDuration 
     */
    static set(player, text, stayDuration = 20*3) {
        const data = {
            text: text,
            stayTick: stayDuration,
            startTick: system.currentTick
        };

        playerDB.set(player, `actionbar`, data);
    }

    static loop(player) {
        const data = playerDB.get(player, `actionbar`);
        if(!data)return;

        //経過時間の取得
        const tick = system.currentTick - data.startTick;
        //stayTickより多い場合は削除
        if(tick > data.stayTick) playerDB.delete(player, `actionbar`);
    }
}