import { kbMenu } from "../../keyboards/kbMenu";
import { MyContext } from "../../types";

export function onMenu(ctx: MyContext) {
  ctx.reply("Главное меню", kbMenu(ctx));
}
