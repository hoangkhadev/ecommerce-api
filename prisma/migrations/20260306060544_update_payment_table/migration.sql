/*
  Warnings:

  - A unique constraint covering the columns `[txn_ref]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `txn_ref` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "expired_at" TIMESTAMP(3),
ADD COLUMN     "payment_url" TEXT,
ADD COLUMN     "response_code" TEXT,
ADD COLUMN     "txn_ref" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "payments_txn_ref_key" ON "payments"("txn_ref");

-- CreateIndex
CREATE INDEX "payments_txn_ref_idx" ON "payments"("txn_ref");
