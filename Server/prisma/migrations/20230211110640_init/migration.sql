/*
  Warnings:

  - The `userDislike` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `userLike` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "userDislike",
ADD COLUMN     "userDislike" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "userFavorites" SET DEFAULT ARRAY[]::INTEGER[],
DROP COLUMN "userLike",
ADD COLUMN     "userLike" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
