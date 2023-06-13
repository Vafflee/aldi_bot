import { Context } from "telegraf";

export function onHelp(ctx: Context) {
  ctx.reply('Help message');
}