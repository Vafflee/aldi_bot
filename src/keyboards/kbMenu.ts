import { Markup } from "telegraf";
import { MAIN_BUTTONS } from "../constants/buttons";
import { MyContext } from "../types";

const b = MAIN_BUTTONS;
export const kbMenu = (ctx: MyContext) => {
  return Markup.keyboard([
    [b.ABOUT, b.HELP],
    [b.INFO],
    [b.PHOTOS],
    [
      Markup.button.text(b.THANKYOU, !ctx.isStaff),
      Markup.button.text(b.IMBORED, !ctx.isStaff),
    ],
    [Markup.button.text(b.ADMIN, !ctx.isAdmin)],
    [Markup.button.text(b.SEND_REQUEST, ctx.isStaff)],
    [
      Markup.button.text(
        ctx.isAdmin ? b.IM_NOT_AN_ADMIN : b.IM_NOT_A_STAFF,
        !ctx.isStaff
      ),
    ],
  ]).resize();
};
