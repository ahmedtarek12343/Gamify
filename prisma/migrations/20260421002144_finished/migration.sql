/*
  Warnings:

  - You are about to drop the column `gameId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `games` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `totalAmount` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameImage` to the `wishlists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameName` to the `wishlists` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_gameId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_gameId_fkey";

-- DropForeignKey
ALTER TABLE "wishlists" DROP CONSTRAINT "wishlists_gameId_fkey";

-- DropIndex
DROP INDEX "comments_userId_gameId_key";

-- DropIndex
DROP INDEX "orders_userId_gameId_key";

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "gameId",
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "wishlists" ADD COLUMN     "gameImage" TEXT NOT NULL,
ADD COLUMN     "gameName" TEXT NOT NULL;

-- DropTable
DROP TABLE "games";

-- CreateTable
CREATE TABLE "orderItems" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "gameName" TEXT NOT NULL,
    "gameImage" TEXT NOT NULL,
    "gamePrice" DOUBLE PRECISION NOT NULL,
    "gameQuantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orderItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gameStatuses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "gameName" TEXT NOT NULL,
    "gameImage" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gameStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "gameStatuses_userId_gameId_idx" ON "gameStatuses"("userId", "gameId");

-- CreateIndex
CREATE UNIQUE INDEX "gameStatuses_userId_gameId_key" ON "gameStatuses"("userId", "gameId");

-- CreateIndex
CREATE INDEX "wishlists_userId_gameId_idx" ON "wishlists"("userId", "gameId");

-- AddForeignKey
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gameStatuses" ADD CONSTRAINT "gameStatuses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
