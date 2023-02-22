/*
  Warnings:

  - Made the column `createdById` on table `Photo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_createdById_fkey";

-- AlterTable
ALTER TABLE "Photo" ALTER COLUMN "createdById" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
