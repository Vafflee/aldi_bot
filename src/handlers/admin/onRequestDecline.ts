import { NarrowedContext } from "telegraf";
import { CallbackQuery, Update } from "telegraf/typings/core/types/typegram";
import { MyContext } from "types";
import { getRequest } from "../../db/request";
import { declineRequest } from "../../services/declineRequest";

export const onRequestDecline = async (
  ctx: NarrowedContext<
    MyContext & {
      match: RegExpExecArray;
    },
    Update.CallbackQueryUpdate<CallbackQuery>
  >
) => {
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
};
