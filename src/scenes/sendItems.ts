import { TgFileId } from "@prisma/client";
import { createFileId, getFileId } from "../db/tgFileId";
import { DiskItem, MyContext } from "../types";

export async function sendItems(ctx: MyContext, items: DiskItem[]) {
  if (items.length > 10) throw new Error("Too many images");
  const media = [];
  for (const item of items) {
    const tgFileId = await getFileId(item.sha256);
    // console.log(tgFileId);
    media.push({
      group: {
        type: "photo" as const,
        media: tgFileId ? tgFileId.fileId : item.file,
      },
      sha256: item.sha256,
      isFileIdExists: !!tgFileId,
    });
  }
  const messages = await ctx.replyWithMediaGroup(media.map((m) => m.group));
  const newFileIds: TgFileId[] = [];
  let index = 0;
  for (const message of messages) {
    if ("photo" in message) {
      // console.log('-------- media ' + index + ' ------------');
      // console.log(media[index])
      // console.log(message.photo[message.photo.length - 1]);
      const photo = message.photo[message.photo.length - 1];
      if (!media[index].isFileIdExists) {
        newFileIds.push({
          sha256: media[index].sha256,
          fileId: photo.file_id,
        });
      }
      index += 1;
    }
  }
  // console.log(newFileIds);
  await createFileId(newFileIds);
}
