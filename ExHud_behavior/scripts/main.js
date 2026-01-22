import { world, system, } from "@minecraft/server";
import { WorldLoad } from "./lib/WorldLoad";
import { ExHud } from "./ExHud";
import { Actionbar } from "./Actionbar";
import { Sidebar } from "./Sidebar";
import { log } from "./lib/Util";

WorldLoad.subscribe(() => {
    for(const player of world.getPlayers()) {

        Actionbar.set(player, "Actionbar Test", 20 * 100);

    }
});