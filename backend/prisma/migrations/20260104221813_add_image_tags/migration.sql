/*
  Warnings:

  - Made the column `description` on table `Image` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tags` on table `Image` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "filename" DROP NOT NULL,
ALTER COLUMN "mimetype" DROP NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "size" DROP NOT NULL,
ALTER COLUMN "tags" SET NOT NULL;
