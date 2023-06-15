import { Markup } from "telegraf";
import { URLS } from "../constants/links";
import { STAFF_BUTTONS } from "../constants/buttons";

export const kbStaff = Markup.inlineKeyboard([
  [
    Markup.button.webApp(
      STAFF_BUTTONS.ALABUGA_DEVELOPNEMT,
      URLS.STAFF.DEVELOPMENT
    ),
  ],
  [Markup.button.webApp(STAFF_BUTTONS.SEZ, URLS.STAFF.SEZ)],
]);
