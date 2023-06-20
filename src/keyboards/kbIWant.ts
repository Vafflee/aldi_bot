import { Markup } from "telegraf";
import { IWANT_BUTTONS } from "../constants/buttons";

export const kbIWant = Markup.keyboard([
  IWANT_BUTTONS.MEME,
  IWANT_BUTTONS.ADVISE,
  IWANT_BUTTONS.PREDICTION,
  IWANT_BUTTONS.BACK,
]);
