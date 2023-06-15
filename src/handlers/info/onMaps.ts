import { Context } from "telegraf";
import { kbMaps } from "../../keyboards/kbMaps";

export async function onMaps(ctx: Context) {
  ctx.reply("Карты и маршруты автобусов", kbMaps);
}
