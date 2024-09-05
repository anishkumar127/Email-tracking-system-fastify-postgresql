/*
  Warnings:

  - You are about to drop the column `read_counts` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "read_counts",
ADD COLUMN     "readCounts" INTEGER NOT NULL DEFAULT 0;
