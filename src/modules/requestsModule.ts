import { Composer } from "telegraf";
import { MyContext } from "types";
import { MAIN_BUTTONS } from "../constants/buttons";
import { getRequestByUserId } from "../db/request";
import { onSendRequest } from "../handlers/main/onSendRequest";

export const requestsModule = new Composer<MyContext>();
requestsModule.hears([MAIN_BUTTONS.SEND_REQUEST, "/request"], onSendRequest);
requestsModule.action("request-send", async (ctx) => {
  if (ctx.isStaff) return ctx.answerCbQuery("Вы уже сотрудник");
  if (!ctx.user) return ctx.answerCbQuery("Пользователь не установлен");
  try {
    const request = await getRequestByUserId(ctx.user.id);
    if (request) {
      await ctx.answerCbQuery("Запрос уже отправлен, ожидайте ответа");
    } else {
      await ctx.scene.enter("sendrequest");
    }
    ctx.deleteMessage();
  } catch (err) {
    console.error(err);
    ctx.answerCbQuery("Что-то пошло не так");
  }
});
requestsModule.action("request-cancel", async (ctx) => {
  await ctx.deleteMessage();
  ctx.answerCbQuery();
});
