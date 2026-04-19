-- CreateTable
CREATE TABLE "WebinarRegistration" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "jobTitle" TEXT,
    "companyName" TEXT,
    "country" TEXT NOT NULL,
    "state" TEXT,
    "city" TEXT,
    "industry" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "howDidYouHear" TEXT,
    "topicsOfInterest" TEXT[],
    "agreeToTerms" BOOLEAN NOT NULL,
    "subscribeUpdates" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebinarRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WebinarRegistration_email_idx" ON "WebinarRegistration"("email");

-- CreateIndex
CREATE INDEX "WebinarRegistration_createdAt_idx" ON "WebinarRegistration"("createdAt");
