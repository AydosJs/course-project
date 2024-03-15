/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customFields` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "customFields" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "customFields" TEXT NOT NULL,
ADD COLUMN     "tagsId" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Tags_text_key" ON "Tags"("text");
