import { Context } from "telegraf";
import { kbInstructions } from "../../keyboards/kbIndstructions";

export async function onInstructions(ctx: Context) {
  ctx.reply("Инструкции для новых сотрудников", kbInstructions);
}
