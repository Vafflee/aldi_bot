import { sendCatPicture } from "../../helpers/fun/sendCatPicture";
import { sendDogPicture } from "../../helpers/fun/sendDogPicture";
import { sendFoxPicture } from "../../helpers/fun/sendFoxPicture";
import { MyContext } from "../../types";

export async function onImBored(ctx: MyContext) {
  const funcs = [
    // sendRandomMeme,
    sendCatPicture,
    sendDogPicture,
    sendFoxPicture,
    // sendActivity
  ];
  const funcToExec = funcs[Math.floor(Math.random() * funcs.length)];
  funcToExec(ctx);
}
