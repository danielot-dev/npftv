-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'General',
ADD COLUMN     "location" TEXT,
ADD COLUMN     "anonymous" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "websiteUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);
