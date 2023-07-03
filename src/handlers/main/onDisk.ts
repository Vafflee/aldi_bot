import { Markup } from "telegraf";
import { getDiskPathByPath } from "../../db/diskPath";
import { disk } from "../../disk/disk";
import { cachePaths } from "../../helpers/cachePaths";
import { MyContextWithMatch } from "../../types";

const PROJECTS_IN_MESSAGE = 20;

export async function onDisk(ctx: MyContextWithMatch) {
  const type = ctx.match[1];
  ctx.answerCbQuery();
  let path = "";
  if (type === "d") path = "/Завершенные проекты";
  if (type === "c") path = "/Текущие проекты";
  try {
    const folders = (await disk.resources.get(path))._embedded.items;

    if (folders.length === 0) return ctx.reply("В папке пока нет проектов");
    await cachePaths(folders);

    const buttons = await Promise.all(
      folders.map(async (item) => {
        const { id: pathId } = await getDiskPathByPath(item.path);
        return Markup.button.callback(item.name, `pr-${pathId}`);
      })
    );

    let i = 0;
    await ctx.reply(
      "Выберите проект, фотографии которого хотите просмотреть 👇 Полный список проектов вы можете найти на нашем сайте development.alabuga.ru 📄"
    );
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
