import { world, system, CommandPermissionLevel, CustomCommandParamType, CustomCommandStatus, } from "@minecraft/server";
import { Actionbar } from "./Actionbar";
import { Sidebar } from "./Sidebar";

const PREFIX = "eh";

const COMMAND_LIST = [
    { //actionbar
        command: {
            name: `${PREFIX}:` + "actionbar",
            description: "アクションバーを表示します",
            permissionLevel: CommandPermissionLevel.GameDirectors,
            cheatsRequired: true,
            mandatoryParameters: [
                { type: CustomCommandParamType.PlayerSelector, name: "player" },
                { type: CustomCommandParamType.String, name: "text" },
            ],
            optionalParameters: [
                { type: CustomCommandParamType.Integer, name: "stayDuration" },
            ],
        },
        alias: [  ],
        func: function(origin, ...args) {
            system.run(() => {
                const players = args[0];
                const text = args[1];
                const stayDuration = args[2];

                for(const player of players) {
                    Actionbar.set(player, text, stayDuration)
                }
            });
            return {
                status: CustomCommandStatus.Success,
            };
        }
    },

    { //sidebar.set
        command: {
            name: `${PREFIX}:` + "sidebar.set",
            description: "スコアをセットします",
            permissionLevel: CommandPermissionLevel.GameDirectors,
            cheatsRequired: true,
            mandatoryParameters: [
                { type: CustomCommandParamType.PlayerSelector, name: "player" },
                { type: CustomCommandParamType.String, name: "objectiveId" },
                { type: CustomCommandParamType.String, name: "text" },
                { type: CustomCommandParamType.Integer, name: "score" },
            ],
        },
        alias: [  ],
        func: function(origin, ...args) {
            const players = args[0];
            const objectiveId = args[1];
            const text = args[2];
            const score = args[3];

            for(const player of players) {
                const res = Sidebar.set(player, objectiveId, text, score);

                if(res == 1)return {
                    message: `§c"${objectiveId}" ではオブジェクトは見つかりませんでした`,
                    status: CustomCommandStatus.Failure,
                };
            };
            
            return {
                message: `${players.map(p => p.name).join(", ")} の ${text}(${objectiveId}) を ${score} に設定しました`,
                status: CustomCommandStatus.Success,
            };
        }
    },

    { //sidebar.refset
        command: {
            name: `${PREFIX}:` + "sidebar.refset",
            description: "参照元のスコアをセットします",
            permissionLevel: CommandPermissionLevel.GameDirectors,
            cheatsRequired: true,
            mandatoryParameters: [
                { type: CustomCommandParamType.PlayerSelector, name: "player" },
                { type: CustomCommandParamType.String, name: "objectiveId" },
                { type: CustomCommandParamType.String, name: "baseText" },
            ],
        },
        alias: [  ],
        func: function(origin, ...args) {
            const players = args[0];
            const objectiveId = args[1];
            const baseText = args[2];

            for(const player of players) {
                const res = Sidebar.setRef(player, objectiveId, baseText);

                if(res == 1)return {
                    message: `§c"${objectiveId}" ではオブジェクトは見つかりませんでした`,
                    status: CustomCommandStatus.Failure,
                };
                if(res == 2)return {
                    message: `§c"${baseText}" ではスコアは見つかりませんでした`,
                    status: CustomCommandStatus.Failure,
                };
            };
            
            return {
                message: `${players.map(p => p.name).join(", ")} の ${baseText}(${objectiveId}) を設定しました`,
                status: CustomCommandStatus.Success,
            };
        }
    },

    { //sidebar.setRefAll
        command: {
            name: `${PREFIX}:` + "sidebar.refsetall",
            description: "参照元のすべてのスコアをセットします",
            permissionLevel: CommandPermissionLevel.GameDirectors,
            cheatsRequired: true,
            mandatoryParameters: [
                { type: CustomCommandParamType.PlayerSelector, name: "player" },
                { type: CustomCommandParamType.String, name: "objectiveId" },
            ],
        },
        alias: [  ],
        func: function(origin, ...args) {
            const players = args[0];
            const objectiveId = args[1];

            for(const player of players) {
                const res = Sidebar.setRefAll(player, objectiveId);

                if(res == 1)return {
                    message: `§c"${objectiveId}" ではオブジェクトは見つかりませんでした`,
                    status: CustomCommandStatus.Failure,
                };
            };
            
            return {
                message: `${players.map(p => p.name).join(", ")} の すべてのスコア(${objectiveId}) を設定しました`,
                status: CustomCommandStatus.Success,
            };
        }
    },

    { //sidebar.reset
        command: {
            name: `${PREFIX}:` + "sidebar.reset",
            description: "スコアをリセットします",
            permissionLevel: CommandPermissionLevel.GameDirectors,
            cheatsRequired: true,
            mandatoryParameters: [
                { type: CustomCommandParamType.PlayerSelector, name: "player" },
                { type: CustomCommandParamType.String, name: "objectiveId" },
                { type: CustomCommandParamType.String, name: "text" },
            ],
        },
        alias: [  ],
        func: function(origin, ...args) {
            const players = args[0];
            const objectiveId = args[1];
            const text = args[2];

            for(const player of players) {
                const res = Sidebar.reset(player, objectiveId, text);

                if(res == 1)return {
                    message: `§c"${objectiveId}" ではオブジェクトは見つかりませんでした`,
                    status: CustomCommandStatus.Failure,
                };
                if(res == 2)return {
                    message: `§c${players.map(p => p.name).join(", ")} の ${text}(${objectiveId}) のスコアが見つかりませんでした`,
                    status: CustomCommandStatus.Failure,
                };
            };


            return {
                message: `${players.map(p => p.name).join(", ")} の ${text}(${objectiveId}) をリセットしました`,
                status: CustomCommandStatus.Success,
            };
        }
    },

    { //sidebar.resetAll
        command: {
            name: `${PREFIX}:` + "sidebar.resetall",
            description: "スコアをすべてリセットします",
            permissionLevel: CommandPermissionLevel.GameDirectors,
            cheatsRequired: true,
            mandatoryParameters: [
                { type: CustomCommandParamType.PlayerSelector, name: "player" },
                { type: CustomCommandParamType.String, name: "objectiveId" },
            ],
        },
        alias: [  ],
        func: function(origin, ...args) {
            const players = args[0];
            const objectiveId = args[1];

            for(const player of players) {
                const res = Sidebar.resetAll(player, objectiveId);

                if(res == 1)return {
                    message: `§c"${objectiveId}" ではオブジェクトは見つかりませんでした`,
                    status: CustomCommandStatus.Failure,
                };
            };

            return {
                message: `${players.map(p => p.name).join(", ")} の すべてのスコア(${objectiveId}) をリセットしました`,
                status: CustomCommandStatus.Success,
            };
        }
    },

    { //sidebar.show
        command: {
            name: `${PREFIX}:` + "sidebar.show",
            description: "サイドバーを表示します",
            permissionLevel: CommandPermissionLevel.GameDirectors,
            cheatsRequired: true,
            mandatoryParameters: [
                { type: CustomCommandParamType.PlayerSelector, name: "player" },
            ],
            optionalParameters: [
                { type: CustomCommandParamType.String, name: "objectiveId" },
            ],
        },
        alias: [  ],
        func: function(origin, ...args) {
            const players = args[0];
            const objectiveId = args[1];

            for(const player of players) {
                const res = Sidebar.setShow(player, objectiveId);

                if(res == 1)return {
                    message: `§c"${objectiveId}" ではオブジェクトは見つかりませんでした`,
                    status: CustomCommandStatus.Failure,
                };
            }

            if(objectiveId) {
                return {
                    message: `${players.map(p => p.name).join(", ")} のサイドバーに ${objectiveId} を表示しました`,
                    status: CustomCommandStatus.Success,
                };
            }else {
                return {
                    message: `${players.map(p => p.name).join(", ")} のサイドバー非表示しました`,
                    status: CustomCommandStatus.Success,
                };
            };
        }
    },

    { //sidebar.sort
        command: {
            name: `${PREFIX}:` + "sidebar.sort",
            description: "スコアの並び順を設定します",
            permissionLevel: CommandPermissionLevel.GameDirectors,
            cheatsRequired: true,
            mandatoryParameters: [
                { type: CustomCommandParamType.Enum, name: "eh:sortType" },
            ],
        },
        alias: [  ],
        func: function(origin, ...args) {
            const sortType = args[0];

            const res = Sidebar.setSort(sortType);
            if(res == 1)return {
                message: `§c"${sortType}" ではsortTypeは見つかりませんでした`,
                status: CustomCommandStatus.Failure,
            };

            return {
                message: `sortTypeを ${sortType} に設定しました`,
                status: CustomCommandStatus.Success,
            };
        }
    },

    { //sidebar.display
        command: {
            name: `${PREFIX}:` + "sidebar.display",
            description: "サイドバーの表示名を設定します",
            permissionLevel: CommandPermissionLevel.GameDirectors,
            cheatsRequired: true,
            mandatoryParameters: [
                { type: CustomCommandParamType.PlayerSelector, name: "player" },
                { type: CustomCommandParamType.String, name: "objectiveId" },
            ],
            optionalParameters: [
                { type: CustomCommandParamType.String, name: "displayName" },
            ],
        },
        alias: [  ],
        func: function(origin, ...args) {
            const players = args[0];
            const objectiveId = args[1];
            const displayName = args[2];

            for(const player of players) {
                const res = Sidebar.setDisplayName(player, objectiveId, displayName);
                if(res == 1)return {
                    message: `§c"${objectiveId}" ではオブジェクトは見つかりませんでした`,
                    status: CustomCommandStatus.Failure,
                };
            };

            if(displayName)return {
                message: `${players.map(p => p.name).join(", ")} の 表示名を ${displayName} に設定しました`,
                status: CustomCommandStatus.Success,
            };
            else return {
                message: `${players.map(p => p.name).join(", ")} の 表示名をリセットしました`,
                status: CustomCommandStatus.Success,
            };
            
        }
    }, 
];

const ENUM_LIST = {
    "eh:sortType": [ "ascending", "descending" ],
};

system.beforeEvents.startup.subscribe(ev => {
    for(const key of Object.keys(ENUM_LIST)) {
        const ENUM = ENUM_LIST[key];
        ev.customCommandRegistry.registerEnum(key, ENUM);
    }

    for(const DATA of COMMAND_LIST) {
        ev.customCommandRegistry.registerCommand(DATA.command, DATA.func);

        if(DATA?.alias?.length > 0) {
            for(const alia of DATA.alias) {
                const commandCopy = JSON.parse(JSON.stringify(DATA.command));
                commandCopy.name = `${PREFIX}:` + alia;

                ev.customCommandRegistry.registerCommand(commandCopy, DATA.func);
            }
            
        }
    }
});