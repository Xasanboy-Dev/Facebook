/*
  Warnings:

  - The `userFavorites` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userLike` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "userFavorites",
ADD COLUMN     "userFavorites" INTEGER,
ALTER COLUMN "userDislike" DROP NOT NULL,
ALTER COLUMN "userDislike" DROP DEFAULT,
ALTER COLUMN "userDislike" SET DATA TYPE TEXT,
DROP COLUMN "userLike",
ADD COLUMN     "userLike" INTEGER;
