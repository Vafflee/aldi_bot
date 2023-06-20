import axios from "axios";
import { MyContext } from "../../types";

export async function sendCatPicture(ctx: MyContext) {
  try {
    const res = await axios.get<{ url: string }>(
      "https://cataas.com/cat?json=true"
    );
    if (res.data.url)
      ctx.replyWithPhoto("https://cataas.com" + res.data.url, {
        caption: "Держите фото котика",
      });
  } catch (err) {
    console.error(err);
    ctx.reply("Что-то пошло не так, попробуйте позже");
  }
}
