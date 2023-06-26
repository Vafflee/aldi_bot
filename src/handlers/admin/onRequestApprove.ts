import { NarrowedContext } from "telegraf";
import { CallbackQuery, Update } from "telegraf/typings/core/types/typegram";
import { MyContext } from "types";
import { getRequest } from "../../db/request";
import { approveRequest } from "../../services/approveRequest";

export const onRequestApprove = async (
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

  try {
    const updatedUser = await approveRequest(Number.parseInt(ctx.match[1]));
    if (!updatedUser)
      return ctx.answerCbQuery("Что-то пошло не так, попробуйте позже");
    ctx.answerCbQuery("Заявка одобрена");
    await ctx.deleteMessage();
    await ctx.telegram.sendMessage(
      updatedUser.tgId.toString(),
      "Ваша заявка одобрена, пожалуйста обновите главное меню с помощью команды /menu чтобы получить доступ к новым функциям"
    );
  } catch (error) {
    ctx.reply("Что-то пошло не так");
  }
};
