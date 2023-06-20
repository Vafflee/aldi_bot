import { Scenes } from "telegraf";
import { ADMIN_BUTTONS } from "../constants/buttons";
import { getRequest } from "../db/request";
import { onCheckRequests } from "../handlers/admin/onCheckRequests";
import { onMenu } from "../handlers/main/onMenu";
import { kbAdmin } from "../keyboards/kbAdmin";
import { approveRequest } from "../services/approveRequest";
import { declineRequest } from "../services/declineRequest";
import { MyContext } from "../types";

const adminScene = new Scenes.BaseScene<MyContext>("admin");

adminScene.enter((ctx) => ctx.reply("Панель администратора", kbAdmin));

adminScene.hears(ADMIN_BUTTONS.CHECK_REQUESTS, onCheckRequests);
adminScene.hears([ADMIN_BUTTONS.BACK, "/menu"], (ctx) => ctx.scene.leave());

adminScene.action(/^request-approve-(\d+)$/, async (ctx) => {
  if (!ctx.isAdmin) return ctx.answerCbQuery("У вас нет на это прав");
  if (!(await getRequest(Number.parseInt(ctx.match[1]))))
    return ctx.answerCbQuery(
      "Нет такого запроса, возможно он был изменен или удален"
    );

  const updatedUser = await approveRequest(Number.parseInt(ctx.match[1]));
  if (!updatedUser)
    return ctx.answerCbQuery("Что-то пошло не так, попробуйте позже");
  ctx.answerCbQuery("Заявка одобрена");
  await ctx.deleteMessage();
  ctx.telegram.sendMessage(
    updatedUser.tgId.toString(),
    "Ваша заявка одобрена, пожалуйста обновите меню с помощью команды /menu чтобы получить доступ к новым функциям"
  );
});

adminScene.action(/^request-decline-(\d+)$/, async (ctx) => {
  if (!ctx.isAdmin) return ctx.answerCbQuery("У вас нет на это прав");
  if (!(await getRequest(Number.parseInt(ctx.match[1]))))
    return ctx.answerCbQuery(
      "Нет такого запроса, возможно он был изменен или удален"
    );

  const declinedRequest = await declineRequest(Number.parseInt(ctx.match[1]));
  if (!declinedRequest)
    return ctx.answerCbQuery("Что-то пошло не так, попробуйте позже");
  ctx.answerCbQuery("Заявка отклонена");
  ctx.deleteMessage();
});

adminScene.leave(onMenu);

export { adminScene };
