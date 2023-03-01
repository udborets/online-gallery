-- DropIndex
DROP INDEX "Album_name_key";

-- DropIndex
DROP INDEX "Photo_name_key";

-- AlterTable
ALTER TABLE "Photo" ALTER COLUMN "name" SET DEFAULT 'Photo';
