import { Scenes } from "telegraf";
import { MyContext } from "../types";
import { onMenu } from "../handlers/main/onMenu";
import { ADMIN_BUTTONS } from "../constants/buttons";
import { onCheckRequests } from "../handlers/admin/onCheckRequests";
import { kbAdmin } from "../keyboards/kbAdmin";
import { approveRequest } from "../services/approveRequest";
import { declineRequest } from "../services/declineRequest";

const adminScene = new Scenes.BaseScene<MyContext>("admin");

adminScene.enter((ctx) => ctx.reply("Панель администратора", kbAdmin));

adminScene.hears(ADMIN_BUTTONS.CHECK_REQUESTS, onCheckRequests);
adminScene.hears(ADMIN_BUTTONS.BACK, (ctx) => ctx.scene.leave());

adminScene.action(/^request-approve-(\d+)$/, async (ctx) => {
  if (!ctx.isAdmin) return ctx.answerCbQuery("У вас нет на это прав");
  const updatedUser = await approveRequest(Number.parseInt(ctx.match[1]));
  if (!updatedUser)
    return ctx.answerCbQuery("Что-то пошло не так, попробуйте позже");
  ctx.answerCbQuery("Заявка одобрена");
  ctx.deleteMessage();
});

adminScene.action(/^request-decline-(\d+)$/, async (ctx) => {
  if (!ctx.isAdmin) return ctx.answerCbQuery("У вас нет на это прав");
  const declinedRequest = await declineRequest(Number.parseInt(ctx.match[1]));
  if (!declinedRequest)
    return ctx.answerCbQuery("Что-то пошло не так, попробуйте позже");
  ctx.answerCbQuery("Заявка отклонена");
  ctx.deleteMessage();
});

adminScene.leave(onMenu);

export { adminScene };
