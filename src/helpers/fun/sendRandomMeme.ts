import { MyContext } from "../../types";
import { getMemes } from "./getMemes";

export async function sendRandomMeme(ctx: MyContext) {
  try {
    const memes = await getMemes();
    if (memes.length > 0)
      ctx.replyWithPhoto(memes[Math.floor(Math.random() * memes.length)]);
  } catch (err) {
    console.error(err);
    ctx.reply("Что-то пошло не так, попробуйте позже");
  }
}
