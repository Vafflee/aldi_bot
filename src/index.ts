import { Postgres } from "@telegraf/session/pg";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { Scenes, Telegraf, session } from "telegraf";
import { onStart } from "./handlers/onStart";
import { setIsStaffAndIsAdmin } from "./middlewares/setIsStaff";
import { useUser } from "./middlewares/useUser";
import { mainModule } from "./modules/mainModule";
import { requestsModule } from "./modules/requestsModule";
import { adminScene } from "./scenes/adminScene";
import { infoScene } from "./scenes/infoScene";
import { sendRequestScene } from "./scenes/sendRequestScene";
import { sendThankYouScene } from "./scenes/sendThankYouScene";
import { thankYouScene } from "./scenes/thankyouScene";
import { MyContext } from "./types";

expand(config());

const tgToken = process.env.TG_TOKEN;
if (!tgToken) throw new Error("No TG_TOKEN");
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
  [infoScene, adminScene, thankYouScene, sendThankYouScene, sendRequestScene],
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

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
