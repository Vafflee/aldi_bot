import { Markup } from "telegraf";
import { THANKYOU_BUTTONS } from "../constants/buttons";

export const kbThankYou = Markup.keyboard([
  [THANKYOU_BUTTONS.SEND_THANKYOU, THANKYOU_BUTTONS.CHECK_THANKYOU],
  [THANKYOU_BUTTONS.RATING],
  [THANKYOU_BUTTONS.BACK],
]).resize();
