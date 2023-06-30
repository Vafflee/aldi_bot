import { Markup, Scenes } from "telegraf";
import { THANKYOU_BUTTONS } from "../constants/buttons";
import { THANKS_PER_PAGE } from "../constants/thankyou";
import {
  getThanksByRecipientId,
  getThanksTotalByRecipientId,
} from "../db/thankyou";
import { onThanksRating } from "../handlers/thankyou/onThanksRating";
import { formatThanks } from "../helpers/formatThanks";
import { kbThankYou } from "../keyboards/kbThankYou";
import { sendKbMenu } from "../services/sendKbMenu";
import { MyContext } from "../types";

const thankYouScene = new Scenes.BaseScene<MyContext>("thankyou");

// Set total thanks count and total pages
thankYouScene.use(async (ctx, next) => {
  const thanksTotalCount = await getThanksTotalByRecipientId(ctx.user.id);
  ctx.scene.state = {
    thanksTotalCount,
    totalPages: Math.ceil(thanksTotalCount / THANKS_PER_PAGE),
  };
  return await next();
});

// Handlers
thankYouScene.enter((ctx) =>
  ctx.reply(
    'Здесь вы можете отправить или просмотреть статистику практики "Спасибо"',
    kbThankYou
  )
);
thankYouScene.hears(THANKYOU_BUTTONS.SEND_THANKYOU, (ctx) => {
  if (ctx.isStaff) ctx.scene.enter("sendthankyou");
});
thankYouScene.hears(THANKYOU_BUTTONS.CHECK_THANKYOU, async (ctx) => {
  if (ctx.scene.state.thanksTotalCount > 0)
    await ctx.reply(
      `Вы получили уже ${ctx.scene.state.thanksTotalCount} "Спасибо" за этот месяц, продолжайте в том же духе! 😀`
    );
  if (ctx.isStaff) replyWithThanksPage(ctx, 1, true);
});
thankYouScene.hears(THANKYOU_BUTTONS.RATING, onThanksRating);
thankYouScene.hears(THANKYOU_BUTTONS.BACK, (ctx) =>
  ctx.scene.leave().then(() => sendKbMenu(ctx))
);
thankYouScene.action(/^thanks-page-(\d+)$/, (ctx) => {
  if (ctx.isStaff)
    replyWithThanksPage(ctx, Number.parseInt(ctx.match[1]), false);
});

export { thankYouScene };

async function replyWithThanksPage(
  ctx: MyContext,
  page: number,
  replyWithNewMessage: boolean
) {
  try {
    const thanks = await getThanksByRecipientId(ctx.user.id, {
      skip: THANKS_PER_PAGE * (page - 1),
      take: THANKS_PER_PAGE,
    });

    if (thanks.length === 0)
      return ctx.reply('У вас пока нет полученных "Спасибо"');

    const kb = Markup.inlineKeyboard([
      Markup.button.callback("⬅️", `thanks-page-${page - 1}`, page === 1),
      Markup.button.callback(
        "➡️",
        `thanks-page-${page + 1}`,
        ctx.scene.state.thanksTotalCount <= THANKS_PER_PAGE * page
      ),
    ]);

    if (!replyWithNewMessage) {
      await ctx.editMessageText(
        formatThanks(thanks, page, ctx.scene.state.totalPages),
        { parse_mode: "HTML" }
      );
      await ctx.editMessageReplyMarkup(kb.reply_markup);
      ctx.answerCbQuery();
    } else {
      ctx.replyWithHTML(
        formatThanks(thanks, page, ctx.scene.state.totalPages),
        kb
      );
    }
  } catch (err) {
    console.error(err);
    ctx.reply("Что-то пошло не так, попробуйте позже");
    ctx.answerCbQuery();
  }
}
