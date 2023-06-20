import { Scenes } from "telegraf";
import { INFO_BUTTONS } from "../constants/buttons";
import { onInstructions } from "../handlers/info/onInstructions";
import { onMaps } from "../handlers/info/onMaps";
import { onStaff } from "../handlers/info/onStaff";
import { onMenu } from "../handlers/main/onMenu";
import { kbInfo } from "../keyboards/kbInfo";
import { MyContext } from "../types";

const infoScene = new Scenes.BaseScene<MyContext>("info");

infoScene.enter((ctx) => {
  console.log("Enter info");
  ctx.reply("База знаний Алабуга Development", kbInfo);
});
infoScene.hears([INFO_BUTTONS.BACK, "/menu"], (ctx) => ctx.scene.leave());
infoScene.hears(INFO_BUTTONS.INSTRUCTIONS, onInstructions);
infoScene.hears(INFO_BUTTONS.MAPS, onMaps);
infoScene.hears(INFO_BUTTONS.STAFF, onStaff);
infoScene.leave((ctx) => {
  console.log("Leave info");
  onMenu(ctx);
});

export { infoScene };
