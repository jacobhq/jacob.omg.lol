-- CreateTable
CREATE TABLE "Stream" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "videoID" VARCHAR(255) NOT NULL,
    "liveNow" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);
