-- AlterTable
ALTER TABLE "blogs" ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "tags" ALTER COLUMN "deleted_at" DROP NOT NULL,
ALTER COLUMN "deleted_at" DROP DEFAULT;
