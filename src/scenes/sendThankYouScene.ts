import { Markup, Scenes } from "telegraf";
import { createThankYou } from "../db/thankyou";
import { getUserByTgId, searchUsersByName } from "../db/user";
import { onMenu } from "../handlers/main/onMenu";
import { MyContext } from "../types";

function endScene(ctx: MyContext) {
  if (ctx.isStaff) ctx.scene.enter("thankyou");
  else onMenu(ctx);
}

const inputUserHandler = async (
  ctx: MyContext & {
    callbackQuery: {
      data: string;
    };
  }
) => {
  // on action
  if (ctx.callbackQuery) {
    ctx.scene.state = {
      recipientId: Number.parseInt(ctx.callbackQuery.data),
    };
    ctx.answerCbQuery();
    await ctx.reply("Введите сообщение");
    return ctx.wizard.next();
  }
  // on cancel
  if ("text" in ctx.message && ctx.message.text === "Отмена")
    return endScene(ctx);
  // on user_shared
  if ("user_shared" in ctx.message) {
    const recipient = await getUserByTgId(ctx.message.user_shared.user_id);

    if (!recipient)
      return ctx.reply(
        'Этот пользователь еще не взаимодействовал с ботом, так что отправить ему "Спасибо" не получится'
      );
    if (recipient.id === ctx.user.id)
      return ctx.reply('Вы не можете отправить "Спасибо" самому себе');

    ctx.scene.state = {
      recipientId: recipient.id,
    };
    await ctx.reply("Введите сообщение");
    return ctx.wizard.next();
  }
  // on other text
  if ("text" in ctx.message) {
    try {
      const users = (await searchUsersByName(ctx.message.text)).filter(
        (user) => user.id !== ctx.user.id
      );
      if (users.length === 0)
        return ctx.reply("Не удалось найти пользователей по данному запросу");
      await ctx.reply(
        'Выберите пользователя, которому хотите отправить "Спасибо"'
      );
      for (const user of users) {
        await ctx.reply(
          `${user.fullName} (${user.tgUsername}) - ${user.job}`,
          Markup.inlineKeyboard([
            Markup.button.callback("Выбрать", user.id.toString()),
          ])
        );
      }
    } catch (err) {
      await ctx.reply("Что-то пошло не так, попробуйте позже");
      console.error(err);
      endScene(ctx);
    }
  }
};

const inputMessageHandler = async (ctx: MyContext) => {
  if (!("text" in ctx.message)) return;
  const { recipientId } = ctx.scene.state;
  if (ctx.message.text.length > 200) {
    return await ctx.reply(
      "Краткость - сестра таланта, пожалуйста, постарайтесь вместить ваше сообщение в 200 символов"
    );
  }
  try {
    const createdThankYou = await createThankYou(recipientId, ctx.message.text);
    if (!createdThankYou) throw new Error("Error in creating ThankYou");
    await ctx.reply('"Спасибо" успешно отправлено"');
  } catch (err) {
    console.error(err);
    await ctx.reply("Что-то пошло не так, попробуйте позже");
  }
  endScene(ctx);
};

const sendThankYouScene = new Scenes.WizardScene<MyContext>(
  "sendthankyou",
  inputUserHandler,
  inputMessageHandler
);

sendThankYouScene.enter((ctx) =>
  ctx.reply(
    'Пожалуйста, введите частичное или полное имя получателя, либо нажмите кнопку "Указать пользователя"',
    Markup.keyboard([
      Markup.button.userRequest("Указать пользователя", 1),
      "Отмена",
    ]).resize()
  )
);

export { sendThankYouScene };