import { Context, Markup } from "telegraf";
import { MAIN_BUTTONS } from "../../constants/buttons";
import { ABOUT_TEXT } from "../../constants/texts";

export function onAbout(ctx: Context) {
  ctx.reply(
    ABOUT_TEXT,
    Markup.inlineKeyboard([
      Markup.button.callback(MAIN_BUTTONS.DONE_PROJECTS, "projects-d"),
      Markup.button.callback(MAIN_BUTTONS.CURRENT_PROJECTS, "projects-c"),
    ])
  );
}
