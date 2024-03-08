-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('active', 'banned', 'deleted');

-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(256) NOT NULL,
    "middle_name" VARCHAR(256),
    "last_name" VARCHAR(256) NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "password" TEXT NOT NULL,
    "status" "CustomerStatus" NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");
