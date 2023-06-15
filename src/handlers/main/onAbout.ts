import { Context } from "telegraf";

export function onAbout(ctx: Context) {
  ctx.reply("Сообщение о компании");
}
