import { translate } from "@vitalets/google-translate-api";
import axios from "axios";
import { MyContext } from "../../types";

export async function sendActivity(ctx: MyContext) {
  try {
    const res = await axios.get<{ activity: string }>(
      "https://www.boredapi.com/api/activity"
    );
    if (!res.data.activity)
      throw new Error("No activity in the response from www.boredapi.com");
    // console.log(res)
    // const translation = await axios.post('OST https://translation.googleapis.com/language/translate/v2', {
    //   source: "en",
    //   target: "ru",
    //   format: 'text',
    //   q: [
    //     res.data.activity
    //   ],
    // })
    const startStrings = ["Try to", "Go", "You can", "Just"];
    const randomStart =
      startStrings[Math.floor(Math.random() * startStrings.length)];
    const translation = await translate(
      `${randomStart} ${res.data.activity.toLowerCase()}`,
      {
        from: "en",
        to: "ru",
      }
    );
    // console.log(translation)
    ctx.reply(translation.text);
  } catch (err) {
    console.error(err);
    ctx.reply("Что-то пошло не так, попробуйте позже");
  }
}
