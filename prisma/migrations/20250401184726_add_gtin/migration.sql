/*
  Warnings:

  - A unique constraint covering the columns `[gtin]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gtin` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_qrCode_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "gtin" TEXT NOT NULL,
ALTER COLUMN "qrCode" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_gtin_key" ON "Product"("gtin");
