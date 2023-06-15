import { Context } from "telegraf";
import { kbStaff } from "../../keyboards/kbStaff";

export async function onStaff(ctx: Context) {
  ctx.reply("Информация о ключевых сотрудниках", kbStaff);
}
