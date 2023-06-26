import { sendCatPicture } from "../../services/fun/sendCatPicture";
import { sendDogPicture } from "../../services/fun/sendDogPicture";
import { sendFoxPicture } from "../../services/fun/sendFoxPicture";
import { MyContext } from "../../types";

export async function onImBored(ctx: MyContext) {
  const funcs = [
    sendCatPicture,
    sendDogPicture,
    sendFoxPicture,
    // sendMeme
  ];
  const funcToExec = funcs[Math.floor(Math.random() * funcs.length)];
  funcToExec(ctx);
}
