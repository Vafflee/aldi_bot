import { ThankYou } from "@prisma/client";

export function formatThanks(
  thanks: ThankYou[],
  page: number,
  totalPages: number
) {
  let res = "";
  let date = thanks[0].creationDate.toLocaleDateString();
  res += `<code>&gt;--&lt;     ${date}     &gt;--&lt;</code>\n`;
  thanks.forEach((thankYou, i) => {
    // const newDate = new Date (Number(thankYou.creationDate)).toLocaleDateString();
    const newDate = thankYou.creationDate.toLocaleDateString();
    if (newDate !== date) {
      res += `<code>&gt;--&lt;     ${newDate}     &gt;--&lt;</code>\n`;
      date = newDate;
    } else {
      if (i > 0) res += "<code>&gt;--------------------------&lt;</code>\n";
    }
    res += `\n<i>${thankYou.message}</i>\n\n`;
  });
  res += "<code>&gt;--------------------------&lt;</code>\n";
  res += `Стр. ${page} из ${totalPages}`;
  return res;
}
