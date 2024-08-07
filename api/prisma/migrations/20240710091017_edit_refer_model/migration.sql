/*
  Warnings:

  - You are about to alter the column `urgent` on the `ReferList` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `ReferList` MODIFY `urgent` INTEGER NOT NULL;
