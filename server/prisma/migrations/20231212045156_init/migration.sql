-- DropForeignKey
ALTER TABLE "Org" DROP CONSTRAINT "Org_personnelsId_fkey";

-- AlterTable
ALTER TABLE "Org" ALTER COLUMN "personnelsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Org" ADD CONSTRAINT "Org_personnelsId_fkey" FOREIGN KEY ("personnelsId") REFERENCES "Personnels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
