import { Context } from "telegraf";
import { ABOUT_TEXT } from "../../constants/texts";

export function onAbout(ctx: Context) {
  ctx.reply(ABOUT_TEXT);
}
