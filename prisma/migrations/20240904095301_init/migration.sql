-- CreateTable
CREATE TABLE "EmailTracking" (
    "id" SERIAL NOT NULL,
    "emailId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL,
    "lastPingAt" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "EmailTracking_pkey" PRIMARY KEY ("id")
);
