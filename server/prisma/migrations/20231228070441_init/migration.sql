-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "addressLine2" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "orgId" TEXT,
    "connectedAccId" TEXT NOT NULL,
    "details_submitted" BOOLEAN NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orgId_key" ON "Payment"("orgId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_connectedAccId_key" ON "Payment"("connectedAccId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Org"("id") ON DELETE SET NULL ON UPDATE CASCADE;
