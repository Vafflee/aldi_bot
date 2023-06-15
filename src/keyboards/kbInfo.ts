import { Markup } from "telegraf";
import { INFO_BUTTONS } from "../constants/buttons";
import { URLS } from "../constants/links";

export const kbInfo = Markup.keyboard([
  [
    Markup.button.webApp(INFO_BUTTONS.GLOSSARY, URLS.GLOSSARY),
    INFO_BUTTONS.INSTRUCTIONS,
  ],
  [INFO_BUTTONS.MAPS, INFO_BUTTONS.STAFF],
  [INFO_BUTTONS.BACK],
]).resize();
