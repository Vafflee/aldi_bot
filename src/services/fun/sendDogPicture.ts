import axios from "axios";
import { MyContext } from "../../types";

export async function sendDogPicture(ctx: MyContext) {
  try {
    const res = await axios.get<{ status: string; message: string }>(
      "https://dog.ceo/api/breeds/image/random"
    );
    if (res.data.status === "success")
      ctx.replyWithPhoto(res.data.message, {
        caption: "Держите фото собачки",
      });
  } catch (err) {
    console.error(err);
    ctx.reply("Что-то пошло не так, попробуйте позже");
  }
}
