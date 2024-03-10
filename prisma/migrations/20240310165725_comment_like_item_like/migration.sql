/*
  Warnings:

  - You are about to drop the column `itemCommentsId` on the `CommentLike` table. All the data in the column will be lost.
  - You are about to drop the column `collectionCommentsId` on the `ItemLike` table. All the data in the column will be lost.
  - You are about to drop the column `itemCommentsId` on the `ItemLike` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_itemCommentsId_fkey";

-- AlterTable
ALTER TABLE "CommentLike" DROP COLUMN "itemCommentsId";

-- AlterTable
ALTER TABLE "ItemLike" DROP COLUMN "collectionCommentsId",
DROP COLUMN "itemCommentsId";
