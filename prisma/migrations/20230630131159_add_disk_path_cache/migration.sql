-- CreateTable
CREATE TABLE "DiskPath" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "DiskPath_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiskPath_path_key" ON "DiskPath"("path");
