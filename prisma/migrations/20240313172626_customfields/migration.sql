/*
  Warnings:

  - You are about to drop the column `customFields` on the `Collection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "customFields";

-- CreateTable
CREATE TABLE "CollectionCustomField" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "collectionId" TEXT,

    CONSTRAINT "CollectionCustomField_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CollectionCustomField" ADD CONSTRAINT "CollectionCustomField_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
