/*
  Warnings:

  - You are about to drop the column `product_id` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cart_id,product_variant_id]` on the table `cart_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[order_id,product_variant_id]` on the table `order_items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_variant_id` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_variant_id` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "product_images" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "product_variant_id" INTEGER NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_images_product_variant_id_idx" ON "product_images"("product_variant_id");