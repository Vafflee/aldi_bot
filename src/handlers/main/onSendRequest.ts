import { Markup } from "telegraf";
import { MyContext } from "../../types";

export function onSendRequest(ctx: MyContext) {
  if (ctx.isStaff) return ctx.reply("Вы уже сотрудник");
  ctx.reply(
    "Вы хотите отправить запрос на доступ к функциям только для сотрудников?",
    Markup.inlineKeyboard([
      Markup.button.callback("Да", `request-send`),
      Markup.button.callback("Отмена", "request-cancel"),
    ])
  );
}
