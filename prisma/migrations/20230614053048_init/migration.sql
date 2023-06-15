-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tgId" TEXT NOT NULL,
    "job" TEXT,
    "role" TEXT NOT NULL DEFAULT 'User'
);

-- CreateIndex
CREATE UNIQUE INDEX "User_tgId_key" ON "User"("tgId");
