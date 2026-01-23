import { world, system, } from "@minecraft/server";
import { WorldLoad } from "./lib/WorldLoad";
import { log, Util, getTime } from "./lib/Util";

import "./ExHud";
import "./command";

export const VERSION = [ 0, 1, 0 ];

WorldLoad.subscribe(ev => {
    ev.reloadLog(`ExHud`, VERSION);
});

system.runInterval(() => {
    for(const player of world.getPlayers()) {
        player.runCommand(`actionbar @s "name: ${player.name}\naa"`);

        player.runCommand(`sidebar.show @s info`);
        player.runCommand(`sidebar.display @s info ${player.name}`);
        player.runCommand(`sidebar.resetall @s info`);

        player.runCommand(`sidebar.setrefall @s info`);
        // player.runCommand(`sidebar.set @s info "test/100" 100`);
        // player.runCommand(`sidebar.set @s info "X: ${player.location.x.toFixed(1)}" -2`);
        // player.runCommand(`sidebar.set @s info "Y: ${player.location.y.toFixed(1)}" -3`);
        // player.runCommand(`sidebar.set @s info "Z: ${player.location.z.toFixed(1)}" -4`);

        // for(let i=0; i<5; i++) {
        //     player.runCommand(`sidebar.set @s info "${i} / Test / Test" ${i}`);
        // }


    }
})