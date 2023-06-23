import { Markup } from "telegraf";
import { ADMIN_BUTTONS } from "../constants/buttons";

const b = ADMIN_BUTTONS;
export const kbAdmin = Markup.keyboard([
  [b.CHECK_REQUESTS],
  [b.ADD_ADMIN],
  [b.BACK],
]).resize();
