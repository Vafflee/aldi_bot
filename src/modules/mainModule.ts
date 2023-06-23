import { Composer } from "telegraf";
import { MAIN_BUTTONS } from "../constants/buttons";
import { onAbout } from "../handlers/main/onAbout";
import { onAdmin } from "../handlers/main/onAdmin";
import { onHelp } from "../handlers/main/onHelp";
import { onImBored } from "../handlers/main/onImBored";
import { onInfo } from "../handlers/main/onInfo";
import { onMenu } from "../handlers/main/onMenu";
import { onThankYou } from "../handlers/main/onThankYou";
import { MyContext } from "../types";

const mainModule = new Composer<MyContext>();
mainModule.hears(["/menu"], onMenu);
mainModule.hears([MAIN_BUTTONS.ABOUT, "/about"], onAbout);
mainModule.hears([MAIN_BUTTONS.HELP, "/help"], onHelp);
mainModule.hears([MAIN_BUTTONS.INFO, "/info"], onInfo);
mainModule.hears([MAIN_BUTTONS.THANKYOU, "/thankyou"], onThankYou);
mainModule.hears([MAIN_BUTTONS.ADMIN, "/admin"], onAdmin);
mainModule.hears([MAIN_BUTTONS.IMBORED, "/imbored"], onImBored);

export { mainModule };
