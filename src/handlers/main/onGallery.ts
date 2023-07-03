import { getDiskPath } from "../../db/diskPath";
import { disk } from "../../disk/disk";
import { sendItems } from "../../scenes/sendItems";
import { MyContext, MyContextWithMatch } from "../../types";

export async function onGallery(ctx: MyContextWithMatch) {
  try {
    const diskPath = await getDiskPath(Number(ctx.match[1]));
    if (!diskPath)
      throw new Error("Unable to find path with id " + ctx.match[1]);

    await sendImagesInFolder(ctx, diskPath.path);
    ctx.answerCbQuery();
  } catch (error) {
    console.error(error);
    ctx.answerCbQuery("Что-то пошло не так");
  }
}

async function sendImagesInFolder(ctx: MyContext, path: string) {
  const resources = await disk.resources.get(path);
  const items = [...resources._embedded.items].filter(
    (item) => !item.name.endsWith(".txt")
  );
  while (items.length > 0) {
    const part = items.splice(0, 10);
    await sendItems(ctx, part);
  }
}
