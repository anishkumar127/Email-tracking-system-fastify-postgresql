/*
  Warnings:

  - Changed the type of `sendDate` on the `Tickets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Tickets" DROP COLUMN "sendDate",
ADD COLUMN     "sendDate" TIMESTAMP(3) NOT NULL;
