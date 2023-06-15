import { config } from "dotenv";
import { Client } from "@notionhq/client";
config();
import { SQLite } from "@telegraf/session/sqlite";
import { Scenes, Telegraf, session } from "telegraf";
import { onStart } from "./handlers/onStart";
import { onHelp } from "./handlers/main/onHelp";
import { MAIN_BUTTONS } from "./constants/buttons";
import { onAbout } from "./handlers/main/onAbout";
import { onMenu } from "./handlers/main/onMenu";
import { onInfo } from "./handlers/main/onInfo";
import { MyContext } from "./types";
import { infoScene } from "./scenes/infoScene";
import { useUser } from "./middlewares/useUser";
import { setIsStaffAndIsAdmin } from "./middlewares/setIsStaff";
import { onAdmin } from "./handlers/main/onAdmin";
import { adminScene } from "./scenes/adminScene";
import { onSendRequest } from "./handlers/main/onSendRequest";
import { ROLES } from "./constants/userRoles";
import { createRequest, getRequestByUserId } from "./db/request";
import { onEmotionalHelp } from "./handlers/main/onEmotionalHelp";

const tgToken = process.env.TG_TOKEN;
const ntToken = process.env.NOTION_TOKEN;
if (!tgToken) throw new Error("No TG_TOKEN");
if (!ntToken) throw new Error("No NOTION_TOKEN");

const notion = new Client({
  auth: ntToken,
});

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
const store = SQLite<object>({
  filename: "./sessions.sqlite",
});
bot.use(session({ store }));

// Use scenes
const stage = new Scenes.Stage<MyContext>([infoScene, adminScene]);
bot.use(stage.middleware());

bot.start(onStart);
bot.hears(["/menu"], onMenu);
bot.hears([MAIN_BUTTONS.ABOUT, "/about"], onAbout);
bot.hears([MAIN_BUTTONS.HELP, "/help"], onHelp);
bot.hears([MAIN_BUTTONS.INFO, "/info"], onInfo);
bot.hears([MAIN_BUTTONS.EMOTIONAL_HELP, "/emotional_help"], onEmotionalHelp);
bot.hears([MAIN_BUTTONS.ADMIN, "/admin"], onAdmin);
bot.hears([MAIN_BUTTONS.SEND_REQUEST], onSendRequest);

bot.action("request-send", async (ctx) => {
  if (ctx.isStaff) return ctx.answerCbQuery("Вы уже сотрудник");
  if (!ctx.user) return ctx.answerCbQuery("Пользователь не установлен");
  try {
    const request = await getRequestByUserId(ctx.user.id);
    if (request) {
      await ctx.answerCbQuery("Запрос уже отправлен, ожидайте ответа");
    } else {
      await createRequest(ctx.user.id, ROLES.STAFF);
      await ctx.answerCbQuery("Заявка успешно отправлена");
    }
    ctx.deleteMessage();
  } catch (err) {
    console.error(err);
    ctx.answerCbQuery("Что-то пошло не так");
  }
});
bot.action("request-cancel", async (ctx) => {
  await ctx.deleteMessage();
  ctx.answerCbQuery();
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
