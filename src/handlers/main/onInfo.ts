import { Context } from "telegraf";
import { kbInfo } from "../../keyboards/kbInfo";
import { MyContext } from "../../types";

export function onInfo(ctx: MyContext) {
  ctx.scene.enter("info");
}
