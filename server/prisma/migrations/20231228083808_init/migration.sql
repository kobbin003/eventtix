/*
  Warnings:

  - You are about to drop the column `details_submitted` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "details_submitted",
ADD COLUMN     "detailsSubmitted" BOOLEAN NOT NULL DEFAULT false;
