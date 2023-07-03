import axios from "axios";
import { Markup } from "telegraf";
import { MAIN_BUTTONS } from "../../constants/buttons";
import { getDiskPath } from "../../db/diskPath";
import { disk } from "../../disk/disk";
import { MyContextWithMatch } from "../../types";

export async function onProject(ctx: MyContextWithMatch) {
  try {
    const diskPath = await getDiskPath(Number(ctx.match[1]));
    if (!diskPath)
      throw new Error("Unable to find path with id " + ctx.match[1]);
    const resources = await disk.resources.get(diskPath.path);

    // Set title
    let replyText = `<b>${diskPath.path.slice(1).replace("/", " > ")}</b>\n\n`;
    // Get and set about text
    const aboutFile = resources._embedded.items.find(
      (item) => item.name === "about.txt"
    );
    if (aboutFile) {
      replyText += (
        await axios.get(aboutFile.file, {
          responseType: "text",
        })
      ).data;
    }

    ctx.replyWithHTML(
      replyText,
      Markup.inlineKeyboard([
        Markup.button.callback(MAIN_BUTTONS.SHOW_PHOTOS, "ga-" + ctx.match[1]),
      ])
    );
    ctx.answerCbQuery();
  } catch (error) {
    console.error(error);
    ctx.answerCbQuery("Что-то пошло не так");
  }
}
