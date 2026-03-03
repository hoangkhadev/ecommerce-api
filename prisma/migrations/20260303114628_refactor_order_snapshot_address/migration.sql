/*
  Warnings:

  - Added the required column `detail` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ward` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_address_id_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "detail" TEXT NOT NULL,
ADD COLUMN     "first_name" VARCHAR(60) NOT NULL,
ADD COLUMN     "last_name" VARCHAR(60) NOT NULL,
ADD COLUMN     "phone" VARCHAR(15) NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "ward" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_variant_id_fkey" FOREIGN KEY ("product_variant_id") REFERENCES "product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
