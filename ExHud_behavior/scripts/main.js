import { world, system, } from "@minecraft/server";
import { WorldLoad } from "./lib/WorldLoad";
import { log, Util, getTime } from "./lib/Util";

export const VERSION = [ 0, 1, 0 ];

WorldLoad.subscribe(ev => {
    ev.reloadLog(`ExHud`, VERSION);
});