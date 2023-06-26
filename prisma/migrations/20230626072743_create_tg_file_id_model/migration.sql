-- CreateTable
CREATE TABLE "telegraf-sessions" (
    "key" VARCHAR(32) NOT NULL,
    "session" TEXT,

    CONSTRAINT "telegraf-sessions_pkey" PRIMARY KEY ("key")
);
