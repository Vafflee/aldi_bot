import { disk } from "../../disk/disk";
import { sendItems } from "../../scenes/sendItems";
import { MyContext, MyContextWithMatch } from "../../types";
import { onDisk } from "./onDisk";

export async function onGallery(ctx: MyContextWithMatch) {
  try {
    await sendImagesInFolder(ctx, ctx.match[1]);
    ctx.answerCbQuery();
    onDisk(ctx);
  } catch (error) {
    console.error(error);
    ctx.answerCbQuery("Что-то пошло не так");
  }
}

async function sendImagesInFolder(ctx: MyContext, path: string) {
  const resources = await disk.resources.get(path);
  const items = [...resources._embedded.items];
  await ctx.reply(path.replace("/", ""));
  while (items.length > 0) {
    const part = items.splice(0, 10);
    await sendItems(ctx, part);
  }
}
