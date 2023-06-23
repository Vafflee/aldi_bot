import { kbMenu } from "../../keyboards/kbMenu";
import { MyContext } from "../../types";

export function sendKbMenu(ctx: MyContext) {
  ctx.reply("Главное меню", kbMenu(ctx));
}
