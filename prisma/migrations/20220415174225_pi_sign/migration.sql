-- CreateTable
CREATE TABLE "Sign" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "data" VARCHAR(255) NOT NULL,

    CONSTRAINT "Sign_pkey" PRIMARY KEY ("id")
);
