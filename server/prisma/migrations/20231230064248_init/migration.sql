/*
  Warnings:

  - You are about to drop the `Buyer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Buyer" DROP CONSTRAINT "Buyer_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Buyer" DROP CONSTRAINT "Buyer_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_orgId_fkey";

-- DropForeignKey
ALTER TABLE "Org" DROP CONSTRAINT "Org_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Org" DROP CONSTRAINT "Org_personnelsId_fkey";

-- DropTable
DROP TABLE "Buyer";

-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL,
    "checkoutSessionId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "eventId" TEXT,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_checkoutSessionId_key" ON "Purchase"("checkoutSessionId");

-- AddForeignKey
ALTER TABLE "Org" ADD CONSTRAINT "Org_personnelsId_fkey" FOREIGN KEY ("personnelsId") REFERENCES "Personnels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Org" ADD CONSTRAINT "Org_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
