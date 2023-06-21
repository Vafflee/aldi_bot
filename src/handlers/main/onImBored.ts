import { sendCatPicture } from "../../helpers/fun/sendCatPicture";
import { sendDogPicture } from "../../helpers/fun/sendDogPicture";
import { sendFoxPicture } from "../../helpers/fun/sendFoxPicture";
import { MyContext } from "../../types";

export async function onImBored(ctx: MyContext) {
  const funcs = [sendCatPicture, sendDogPicture, sendFoxPicture];
  const funcToExec = funcs[Math.floor(Math.random() * funcs.length)];
  funcToExec(ctx);
}
