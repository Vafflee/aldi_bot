import { Markup } from "telegraf";
import { disk } from "../../disk/disk";
import { MyContext } from "../../types";

const PROJECTS_IN_MESSAGE = 20;

export async function onDisk(ctx: MyContext) {
  try {
    const folders = (await disk.resources.get("/"))._embedded.items;
    if (folders.length === 0) ctx.reply("В папке пока нет проектов");
    const buttons = folders
      .filter((item) => item.name.length <= 31)
      .map((item) => {
        return Markup.button.callback(item.name, "gallery-" + item.path);
      });
    let i = 0;
    await ctx.reply("Выберите проект, фотографии которого хотите просмотреть");
    while (buttons.length > 0) {
      const part = buttons.splice(0, PROJECTS_IN_MESSAGE);
      const partsByPairs = [];
      while (part.length > 0) {
        partsByPairs.push(part.splice(0, 2));
      }
      await ctx.reply(
        "Проекты с " + (i + 1) + " по " + (i + PROJECTS_IN_MESSAGE) + ":",
        Markup.inlineKeyboard(partsByPairs)
      );
      i += PROJECTS_IN_MESSAGE;
    }
  } catch (error) {
    ctx.reply("Что-то пошло не так");
    console.error(error);
  }
}
