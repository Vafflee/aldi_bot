import { Markup } from "telegraf";
import { INSTRUCTIONS_BUTTONS } from "../constants/buttons";
import { URLS } from "../constants/links";

export const kbInstructions = Markup.inlineKeyboard([
  [
    Markup.button.webApp(INSTRUCTIONS_BUTTONS.CHECK_LIST, URLS.CHECK_LIST),
    Markup.button.webApp(
      INSTRUCTIONS_BUTTONS.SET_GOALS_IN_1C,
      URLS.SET_GOALS_IN_1C
    ),
  ],
  [
    Markup.button.webApp(
      INSTRUCTIONS_BUTTONS.GET_EDUCATIONAL_MATERIALS,
      URLS.GET_EDUCATIONAL_MATERIALS
    ),
    Markup.button.webApp(INSTRUCTIONS_BUTTONS.LOCAL_ACTS, URLS.LOCAL_ACTS),
  ],
]);
