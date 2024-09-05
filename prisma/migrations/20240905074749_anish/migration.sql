/*
  Warnings:

  - You are about to drop the `EmailTracking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EmailTracking";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "emailId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL,
    "lastPingAt" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "ipAddress" TEXT,
    "location" TEXT,
    "browser" TEXT,
    "system" TEXT,
    "deviceInfo" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailId_key" ON "User"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");
