import { Context } from "telegraf";

export function onStart(ctx: Context) {
  ctx.reply('Start message');
}