/*
  Warnings:

  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `ProductVariant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "color",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "variant" TEXT;
