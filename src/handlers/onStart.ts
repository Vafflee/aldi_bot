import { MyContext } from "../types";

export async function onStart(ctx: MyContext) {
  let message =
    'Привет 👋 Я бот "Алабуга Девелопмент", я создан для того, чтобы рассказывать людям о нашем предприятии и помогать нашим отрудникам с различными задачами 😉 Вот мои основные команды:\n';
  try {
    const commands = await ctx.telegram.getMyCommands();
    for (const command of commands) {
      message += `\n/${command.command} - ${command.description}`;
    }
  } catch (err) {
    console.error(err);
    ctx.reply("Что-то пошло не так, попробуйте позже");
  }
  ctx.reply(message);
}
