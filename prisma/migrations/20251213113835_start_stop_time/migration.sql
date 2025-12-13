-- CreateTable
CREATE TABLE "RecordTime" (
    "userId" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "stopTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecordTime_pkey" PRIMARY KEY ("userId")
);
