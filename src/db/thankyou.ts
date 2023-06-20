import { db } from "./db";

type GetThanksOptions = {
  skip?: number;
  take?: number;
};
export async function getThanksByRecipientId(
  recipientId: number,
  options?: GetThanksOptions
) {
  return await db.thankYou.findMany({
    where: {
      recipientId,
    },
    orderBy: {
      creationDate: "desc",
    },
    skip: options.skip,
    take: options.take || 10,
  });
}

export async function getThanksTotalByRecipientId(recipientId: number) {
  return await db.thankYou.count({
    where: {
      recipientId,
    },
  });
}

export async function createThankYou(recipientId: number, message: string) {
  return await db.thankYou.create({
    data: {
      recipientId,
      message,
      creationDate: Date.now(),
    },
  });
}
