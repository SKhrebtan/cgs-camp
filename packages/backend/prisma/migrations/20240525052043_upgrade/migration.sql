/*
  Warnings:

  - You are about to drop the column `isPraivate` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "isPraivate",
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT true;
