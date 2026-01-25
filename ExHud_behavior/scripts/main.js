import { world, system, } from "@minecraft/server";
import { WorldLoad } from "./lib/WorldLoad";
import { PlayerDB, WorldDB } from "./lib/Database";
import { log, Util } from "./lib/Util";

import "./__ExHud";
import "./command";

export const worldDB = new WorldDB("exhud");
export const playerDB = new PlayerDB("exhud");

export const VERSION = [ 0, 2, 1 ];

WorldLoad.subscribe(ev => {
    ev.reloadLog(`§7ExHud`, VERSION);
});

// import { ExHud } from "./ExHud";
// system.runInterval(() => {
//     const start = new Date(); // 処理開始

//     for (const player of world.getPlayers()) {
//         ExHud.actionbar(player, `name: ${player.name}\nactionbar`);

         
//         ExHud.sidebarShow(player, "info");
//         ExHud.sidebarDisplay(player, "info", `${player.name}`);
//         ExHud.sidebarResetAll(player, "info");
//         ExHud.sidebarSort(0);

//         for (let i = 0; i < 30; i++) {
//             ExHud.sidebarSet(player, "info", `Test / ${i}`, i);
//         }
//     }

//     const end = new Date(); // 処理終了
//     const cost = end - start;

//     // log(`§a[計測]§7: ${cost} ms / ${cost/1000} s`);
// }, 20); // 20tick = 約1秒