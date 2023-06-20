import { Markup } from "telegraf";
import { MAPS_BUTTONS } from "../constants/buttons";
import { URLS } from "../constants/links";

export const kbMaps = Markup.inlineKeyboard([
  [Markup.button.webApp(MAPS_BUTTONS.INNER_ROUTES, URLS.MAPS.INNER_ROUTES)],
  [
    Markup.button.url(MAPS_BUTTONS.ROUTES, URLS.MAPS.ROUTES),
    Markup.button.url(MAPS_BUTTONS.OFFICE, URLS.MAPS.OFFICE),
  ],
  [
    Markup.button.url(MAPS_BUTTONS.ALABUGA, URLS.MAPS.ALABUGA),
    Markup.button.url(MAPS_BUTTONS.ELABUGA, URLS.MAPS.ELABUGA),
  ],
]);
