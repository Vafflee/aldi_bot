import axios from "axios";
import { MyContext } from "../../types";

export async function sendFoxPicture(ctx: MyContext) {
  try {
    const res = await axios.get<{ image: string }>(
      "https://randomfox.ca/floof/"
    );
    if (res.data.image)
      ctx.replyWithPhoto(res.data.image, {
        caption: "Держите фото лисички",
      });
  } catch (err) {
    console.error(err);
    ctx.reply("Что-то пошло не так, попробуйте позже");
  }
}
