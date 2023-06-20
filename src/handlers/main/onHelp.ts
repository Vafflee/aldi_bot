import { MyContext } from "../../types";

export async function onHelp(ctx: MyContext) {
  let message =
    "Данный бот предназначен для помощи сотрудникам Алабуга Девелопмент, основные команды:\n";
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
