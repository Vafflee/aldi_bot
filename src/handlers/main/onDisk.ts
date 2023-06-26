import { Markup } from "telegraf";
import { disk } from "../../disk/disk";
import { MyContext } from "../../types";

export async function onDisk(ctx: MyContext) {
  const folders = (await disk.resources.get("/"))._embedded.items;
  const buttons = folders.map((item) => {
    return [Markup.button.callback(item.name, "gallery-" + item.path)];
  });
  ctx.reply(
    "Выберите проект, фотографии которого хотите посмотреть",
    Markup.inlineKeyboard(buttons)
  );
}
