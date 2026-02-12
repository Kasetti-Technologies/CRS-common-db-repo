/*
  Warnings:

  - The values [BOOKED] on the enum `AppointmentStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `date` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `AvailabilityRule` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `Center` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Center` table. All the data in the column will be lost.
  - You are about to drop the column `slotDuration` on the `Modality` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `Operator` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[centerId,modalityId,dayOfWeek]` on the table `AvailabilityRule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Modality` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appointmentDate` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slotMinutes` to the `AvailabilityRule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Center` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Center` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Center` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendorId` to the `Center` table without a default value. This is not possible if the table is not empty.
  - Added the required column `basePrice` to the `CenterModality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dailyCapacity` to the `Machine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Machine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Modality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Operator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AppointmentStatus_new" AS ENUM ('HOLD', 'CONFIRMED', 'CANCELLED', 'EXPIRED', 'BLOCKED');
ALTER TABLE "public"."Appointment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Appointment" ALTER COLUMN "status" TYPE "AppointmentStatus_new" USING ("status"::text::"AppointmentStatus_new");
ALTER TYPE "AppointmentStatus" RENAME TO "AppointmentStatus_old";
ALTER TYPE "AppointmentStatus_new" RENAME TO "AppointmentStatus";
DROP TYPE "public"."AppointmentStatus_old";
COMMIT;

-- DropIndex
DROP INDEX "Appointment_centerId_modalityId_date_idx";

-- DropIndex
DROP INDEX "Appointment_status_expiresAt_idx";

-- DropIndex
DROP INDEX "AvailabilityRule_centerId_modalityId_dayOfWeek_idx";

-- DropIndex
DROP INDEX "Center_slug_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "date",
DROP COLUMN "expiresAt",
ADD COLUMN     "appointmentDate" DATE NOT NULL,
ADD COLUMN     "holdExpiresAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "testKeyword" TEXT,
ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "AvailabilityRule" DROP COLUMN "active",
ADD COLUMN     "slotMinutes" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Center" DROP COLUMN "active",
DROP COLUMN "slug",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "vendorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CenterModality" ADD COLUMN     "basePrice" INTEGER NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Machine" ADD COLUMN     "dailyCapacity" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Modality" DROP COLUMN "slotDuration",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Operator" DROP COLUMN "active",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OperatorLeave" ALTER COLUMN "date" SET DATA TYPE DATE;

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorAdmin" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BranchAdmin" (
    "id" TEXT NOT NULL,
    "centerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BranchAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModalityTestDuration" (
    "id" TEXT NOT NULL,
    "modalityId" TEXT NOT NULL,
    "testKeyword" TEXT NOT NULL,
    "durationMinutes" INTEGER NOT NULL,

    CONSTRAINT "ModalityTestDuration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VendorAdmin_email_key" ON "VendorAdmin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BranchAdmin_centerId_key" ON "BranchAdmin"("centerId");

-- CreateIndex
CREATE UNIQUE INDEX "BranchAdmin_email_key" ON "BranchAdmin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ModalityTestDuration_modalityId_testKeyword_key" ON "ModalityTestDuration"("modalityId", "testKeyword");

-- CreateIndex
CREATE INDEX "Appointment_centerId_modalityId_appointmentDate_idx" ON "Appointment"("centerId", "modalityId", "appointmentDate");

-- CreateIndex
CREATE UNIQUE INDEX "AvailabilityRule_centerId_modalityId_dayOfWeek_key" ON "AvailabilityRule"("centerId", "modalityId", "dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "Modality_code_key" ON "Modality"("code");

-- AddForeignKey
ALTER TABLE "VendorAdmin" ADD CONSTRAINT "VendorAdmin_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Center" ADD CONSTRAINT "Center_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BranchAdmin" ADD CONSTRAINT "BranchAdmin_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "Center"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModalityTestDuration" ADD CONSTRAINT "ModalityTestDuration_modalityId_fkey" FOREIGN KEY ("modalityId") REFERENCES "Modality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
