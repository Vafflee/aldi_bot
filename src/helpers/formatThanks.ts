import { ThankYou } from "@prisma/client";

export function formatThanks(
  thanks: ThankYou[],
  page: number,
  totalPages: number
) {
  let res = "";
  for (const thankYou of thanks) {
    res += `<b>[ Отправлено: ${new Date(
      Number(thankYou.creationDate)
    ).toLocaleDateString()} ]</b>
<i>${thankYou.message}</i>\n\n`;
  }
  res += `Стр. ${page} из ${totalPages}`;
  return res;
}
