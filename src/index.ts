import { Postgres } from "@telegraf/session/pg";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { Scenes, Telegraf, session } from "telegraf";
import { MAIN_BUTTONS } from "./constants/buttons";
import { onChangeRole } from "./handlers/main/onChangeRole";
import { onDisk } from "./handlers/main/onDisk";
import { onGallery } from "./handlers/main/onGallery";
import { onStart } from "./handlers/onStart";
import { setIsStaffAndIsAdmin } from "./middlewares/setIsStaff";
import { useUser } from "./middlewares/useUser";
import { mainModule } from "./modules/mainModule";
import { requestsModule } from "./modules/requestsModule";
import { addAdminScene } from "./scenes/addAdminScene";
import { adminScene } from "./scenes/adminScene";
import { changeRoleScene } from "./scenes/changeRoleScene";
import { infoScene } from "./scenes/infoScene";
import { removeStaffScene } from "./scenes/removeStaffScene";
import { sendRequestScene } from "./scenes/sendRequestScene";
import { sendThankYouScene } from "./scenes/sendThankYouScene";
import { thankYouScene } from "./scenes/thankyouScene";
import { MyContext } from "./types";

expand(config());

const tgToken = process.env.TG_TOKEN;
if (!process.env.TG_TOKEN) throw new Error("No TG_TOKEN");

if (!process.env.YANDEX_PUBLIC_FOLDER_URL)
  throw new Error("No YANDEX_PUBLIC_FOLDER_URL");

const dbHost = process.env.POSTGRES_HOST;
const dbName = process.env.POSTGRES_NAME;
const dbUser = process.env.POSTGRES_USER;
const dbPass = process.env.POSTGRES_PASSWORD;
const dbPort = process.env.POSTGRES_PORT;
if (!(dbHost && dbName && dbUser && dbPass && dbPort))
  throw new Error("No DB requisites");

const bot = new Telegraf<MyContext>(tgToken);

bot.telegram.setMyCommands([
  { command: "start", description: "Начать работу с ботом" },
  { command: "help", description: "Помощь" },
  { command: "menu", description: "Открыть главное меню" },
  { command: "info", description: "Открыть базу знаний" },
  { command: "photos", description: "Открыть базу фотографий" },
  {
    command: "request",
    description: "Отправить запрос на доступ к функциям для сотрудников",
  },
]);

// User identification
bot.use(useUser);
// Set isStaff and isAdmin in context
bot.use(setIsStaffAndIsAdmin);

// Use Sessions storage
const store = Postgres<object>({
  host: dbHost,
  database: dbName,
  user: dbUser,
  password: dbPass,
});
bot.use(session({ store }));

// Use scenes
const stage = new Scenes.Stage<MyContext>(
  [
    infoScene,
    adminScene,
    thankYouScene,
    sendThankYouScene,
    sendRequestScene,
    addAdminScene,
    removeStaffScene,
    changeRoleScene,
  ],
  {
    default: "main",
  }
);
bot.use(stage.middleware());

bot.start(onStart);

// Module for main commands
bot.use(mainModule);

// Module for sending staff role requests
bot.use(requestsModule);

bot.hears([MAIN_BUTTONS.PHOTOS, "/photos"], onDisk);
bot.action(/^gallery-(.*)$/, onGallery);

bot.hears(
  [MAIN_BUTTONS.IM_NOT_AN_ADMIN, MAIN_BUTTONS.IM_NOT_A_STAFF, "/changerole"],
  onChangeRole
);

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
