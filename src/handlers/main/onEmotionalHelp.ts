import { MyContext } from "../../types";

export function onEmotionalHelp(ctx: MyContext) {
  if (ctx.isStaff)
    ctx.reply("Текст с информацией о том, как получить психологическую помощь");
}
