import { createUser, getUserByTgId } from "../db/user";
import { MyContext, NextFn } from "../types";

export async function useUser(ctx: MyContext, next: NextFn) {
  if (ctx.user) return await next();
  if (ctx.chat?.type !== "private") return await next();

  const tgId = ctx.chat?.id;
  const tgUsername = ctx.chat?.username;

  try {
    const user = await getUserByTgId(tgId);
    ctx.user =
      user ||
      (await createUser({
        tgId,
        tgUsername,
      }));
    await next();
  } catch (err) {
    console.log('! useUser.ts error !')
    console.error(err);
    await next();
  }
}
