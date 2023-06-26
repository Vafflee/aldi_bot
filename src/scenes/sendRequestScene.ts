import { Markup, Scenes } from "telegraf";
import { COMMON_BUTTONS } from "../constants/buttons";
import { FULL_NAME } from "../constants/regex";
import { ROLES } from "../constants/userRoles";
import { createRequest } from "../db/request";
import { sendKbMenu } from "../services/sendKbMenu";
import { MyContext } from "../types";

function endScene(ctx: MyContext) {
  ctx.scene.leave();
}

const inputFullNameHandler = async (ctx: MyContext) => {
  if (!("text" in ctx.message)) return;
  if (ctx.message.text === "Отмена") return endScene(ctx);

  const fullName = ctx.message.text.replace(/\s+/, " ");
  if (!fullName.match(FULL_NAME))
    return ctx.reply(
      "Пожалуйста введите свои полные Фамилию, Имя и Отчество (если есть) через пробелы, например Иванов Иван Иванович или Иванов Иван"
    );

  ctx.scene.state = {
    fullName,
  };
  await ctx.reply("Введите вашу должность");

  ctx.wizard.next();
};

const inputJobHandler = async (ctx: MyContext) => {
  if (!("text" in ctx.message)) return;
  if (ctx.message.text === COMMON_BUTTONS.CANCEL) return endScene(ctx);

  const fullName = ctx.scene.state.fullName;
  const job = ctx.message.text.replace(/\s+/, " ");

  try {
    await createRequest(ctx.user.id, fullName, job, ROLES.STAFF);
    await ctx.reply("Заявка успешно отправлена");
  } catch (err) {
    await ctx.reply("Что-то пошло не так, попробуйте позже");
    console.error(err);
  }
  endScene(ctx);
};

const sendRequestScene = new Scenes.WizardScene<MyContext>(
  "sendrequest",
  inputFullNameHandler,
  inputJobHandler
);

sendRequestScene.enter((ctx) =>
  ctx.reply(
    "Пожалуйста, укажите свои полные Фамилию, Имя и Отчество (если есть) через пробелы, например Иванов Иван Иванович или Иванов Иван",
    Markup.keyboard([COMMON_BUTTONS.CANCEL]).resize()
  )
);
sendRequestScene.leave((ctx) => sendKbMenu(ctx));

export { sendRequestScene };
