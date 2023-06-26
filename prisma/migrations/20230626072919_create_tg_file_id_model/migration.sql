-- CreateTable
CREATE TABLE "TgFileId" (
    "sha256" TEXT NOT NULL,
    "fileId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TgFileId_sha256_key" ON "TgFileId"("sha256");
