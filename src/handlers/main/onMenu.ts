import { kbMenu } from "../../keyboards/kbMenu";
import { MyContext } from "../../types";

export function onMenu(ctx: MyContext) {
  // console.log('Sending menu')
  ctx.reply("Главное меню", kbMenu(ctx));
}
