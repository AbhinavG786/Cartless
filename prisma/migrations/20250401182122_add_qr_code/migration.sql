/*
  Warnings:

  - A unique constraint covering the columns `[qrCode]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `qrCode` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "qrCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_qrCode_key" ON "Product"("qrCode");
