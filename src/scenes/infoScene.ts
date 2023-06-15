import { Scenes } from "telegraf";
import { MyContext } from "../types";
import { kbInfo } from "../keyboards/kbInfo";
import { onMenu } from "../handlers/main/onMenu";
import { INFO_BUTTONS } from "../constants/buttons";
import { onInstructions } from "../handlers/info/onInstructions";
import { onMaps } from "../handlers/info/onMaps";
import { onStaff } from "../handlers/info/onStaff";

const infoScene = new Scenes.BaseScene<MyContext>("info");

infoScene.enter((ctx) => ctx.reply("База знаний Алабуга Development", kbInfo));
infoScene.hears(INFO_BUTTONS.BACK, (ctx) => ctx.scene.leave());
infoScene.hears(INFO_BUTTONS.INSTRUCTIONS, onInstructions);
infoScene.hears(INFO_BUTTONS.MAPS, onMaps);
infoScene.hears(INFO_BUTTONS.STAFF, onStaff);
infoScene.leave(onMenu);

export { infoScene };
