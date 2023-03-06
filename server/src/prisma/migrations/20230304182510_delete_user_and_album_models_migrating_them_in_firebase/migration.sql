/*
  Warnings:

  - You are about to drop the `Album` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `avatar` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_authorId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar" SET NOT NULL;

-- DropTable
DROP TABLE "Album";

-- DropTable
DROP TABLE "Photo";
