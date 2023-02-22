/*
  Warnings:

  - You are about to drop the column `createdById` on the `Gallery` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Photo` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Gallery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Gallery" DROP CONSTRAINT "Gallery_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_createdById_fkey";

-- AlterTable
ALTER TABLE "Gallery" DROP COLUMN "createdById",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "createdById",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
