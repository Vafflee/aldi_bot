-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "tgId" BIGINT NOT NULL,
    "tgUsername" TEXT,
    "job" TEXT,
    "role" TEXT NOT NULL DEFAULT 'User',
    "fullName" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThankYou" (
    "id" SERIAL NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "creationDate" BIGINT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "ThankYou_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_tgId_key" ON "User"("tgId");

-- AddForeignKey
ALTER TABLE "ThankYou" ADD CONSTRAINT "ThankYou_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
