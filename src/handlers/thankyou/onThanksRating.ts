import { User } from "@prisma/client";
import { getTopUsersByThanksCount } from "../../db/user";
import { MyContext } from "../../types";

export const onThanksRating = async (ctx: MyContext) => {
  if (!ctx.isStaff) return;

  const rating = await getTopUsersByThanksCount();
  ctx.replyWithHTML(formatRating(rating));
};

function formatRating(
  rating: (User & { _count: { recievedThanks: number } })[]
) {
  let res =
    "<b>Топ сотрудников по количеству полученных благодарностей за месяц:</b> \n";
  rating.forEach((user, index) => {
    res += `  ${index + 1}. ${user.fullName || "@" + user.tgUsername} - ${
      user._count.recievedThanks
    } спс.\n`;
  });
  return res;
}
