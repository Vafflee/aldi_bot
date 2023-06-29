import { User } from "@prisma/client";
import { Markup } from "telegraf";
import { getUser, getUserByTgId, searchUsersByName } from "../db/user";
import { MyContext, MyContextWithCallback } from "../types";

export async function findUser(
  ctx: MyContextWithCallback,
  onError: (err: string) => void
) {
  // on action
  if (ctx.callbackQuery) {
    ctx.answerCbQuery();
    const userId = Number.parseInt(ctx.callbackQuery.data);
    const user = await getUser(userId);
    if (!user) onError("Не получается найти пользователя с id " + userId);
    return user;
  }

  if (!ctx.message) return;
  // on user_shared
  else if ("user_shared" in ctx.message) {
    const user = await getUserByTgId(ctx.message.user_shared.user_id);

    if (!user)
      return onError("Этот пользователь еще не взаимодействовал с ботом");
    if (user.id === ctx.user.id)
      return onError("Вы не можете указать самого себя");

    return user;
  }
  // on other text
  else if ("text" in ctx.message) {
    try {
      const users = (await searchUsersByName(ctx.message.text)).filter(
        (user) => user.id !== ctx.user.id
      );
      if (users.length === 0)
        return onError("Не удалось найти пользователей по данному запросу");
      await ctx.reply("Выберите пользователя");
      sendUserCallbacks(ctx, users);
      return;
    } catch (err) {
      onError("Что-то пошло не так, попробуйте позже");
      console.error(err);
    }
  }
}

async function sendUserCallbacks(ctx: MyContext, users: User[], prefix = "") {
  for (const user of users) {
    await ctx.reply(
      `${user.fullName} ${
        user.tgUsername ? "(@" + user.tgUsername + ")" : ""
      } - ${user.job}`,
      Markup.inlineKeyboard([
        Markup.button.callback("Выбрать", prefix + user.id.toString()),
      ])
    );
  }
}
