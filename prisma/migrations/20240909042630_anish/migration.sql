/*
  Warnings:

  - Added the required column `sendDate` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tickets" ADD COLUMN     "sendDate" TIMESTAMP(3) NOT NULL;
