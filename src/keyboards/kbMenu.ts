import { Markup } from "telegraf";
import { MAIN_BUTTONS } from "../constants/buttons";
import { MyContext } from "../types";

const b = MAIN_BUTTONS;
export const kbMenu = (ctx: MyContext) => {
  return Markup.keyboard([
    [b.ABOUT, b.HELP],
    [b.INFO],
    // [Markup.button.text(b.EMOTIONAL_HELP, !ctx.isStaff)],
    [
      Markup.button.text(b.THANKYOU, !ctx.isStaff),
      Markup.button.text(b.IMBORED, !ctx.isStaff),
    ],
    [Markup.button.text(b.ADMIN, !ctx.isAdmin)],
    [Markup.button.text(b.SEND_REQUEST, ctx.isStaff)],
  ]).resize();
};
