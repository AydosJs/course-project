/*
  Warnings:

  - You are about to drop the `CollectionCustomField` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customFields` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CollectionCustomField" DROP CONSTRAINT "CollectionCustomField_collectionId_fkey";

-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "customFields" JSONB NOT NULL;

-- DropTable
DROP TABLE "CollectionCustomField";
