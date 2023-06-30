/*
  Warnings:

  - The `creationDate` column on the `ThankYou` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `tgId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "ThankYou" DROP COLUMN "creationDate",
ADD COLUMN     "creationDate" TIMESTAMP(3) NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "tgId" SET DATA TYPE INTEGER;
