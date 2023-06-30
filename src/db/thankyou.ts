import { db } from "./db";

type GetThanksOptions = {
  skip?: number;
  take?: number;
};
export async function getThanksByRecipientId(
  recipientId: number,
  options?: GetThanksOptions
) {
  const now = new Date();
  return await db.thankYou.findMany({
    where: {
      recipientId,
      creationDate: {
        gte: new Date(now.getFullYear(), now.getMonth(), 1),
      },
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
      creationDate: {
        gte: new Date("2023-06-01"),
      },
    },
  });
}

export async function createThankYou(recipientId: number, message: string) {
  return await db.thankYou.create({
    data: {
      recipientId,
      message,
    },
  });
}
