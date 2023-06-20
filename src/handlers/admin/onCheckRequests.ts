import { Markup } from "telegraf";
import { REQUESTS_BUTTONS } from "../../constants/buttons";
import { ROLES_MAP } from "../../constants/rolesMap";
import { getRequests } from "../../db/request";
import { MyContext } from "../../types";

export async function onCheckRequests(ctx: MyContext) {
  if (!ctx.isAdmin) return;
  const requests = await getRequests();
  if (requests.length === 0) await ctx.reply("Запросов пока нет");

  for (const request of requests) {
    const userLink = request.user.tgUsername
      ? `@${request.user.tgUsername}`
      : `<a href="tg://user?id=${request.user.tgId}">@${request.user.tgId}</a>`;
    await ctx.replyWithHTML(
      `
<code> ----------- Имя: ------------ </code>\n    \n${
        request.fullName
      } (${userLink})\n
<code> -------- Должность: --------- </code>\n    \n${request.job}\n
<code> ------- Текущая роль: ------- </code>\n    \n"${
        ROLES_MAP[request.user.role]
      }"\n
<code> ---- Запрашиваемая роль: ---- </code>\n    \n"${
        ROLES_MAP[request.role]
      }"\n
    `,
      Markup.inlineKeyboard([
        Markup.button.callback(
          REQUESTS_BUTTONS.APPROVE,
          `request-approve-${request.id}`
        ),
        Markup.button.callback(
          REQUESTS_BUTTONS.DECLINE,
          `request-decline-${request.id}`
        ),
      ])
    );
  }
}
