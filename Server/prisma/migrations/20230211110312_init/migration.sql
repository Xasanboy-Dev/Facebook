/*
  Warnings:

  - Added the required column `dislikes` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dislikes` to the `Videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userDislike` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userLike` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "dislikes" INTEGER NOT NULL,
ADD COLUMN     "likes" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Videos" ADD COLUMN     "dislikes" INTEGER NOT NULL,
ADD COLUMN     "likes" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "userDislike" TEXT NOT NULL,
ADD COLUMN     "userFavorites" INTEGER[],
ADD COLUMN     "userLike" TEXT NOT NULL;
