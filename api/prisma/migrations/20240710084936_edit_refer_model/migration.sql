/*
  Warnings:

  - You are about to alter the column `status` on the `ReferList` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `destinationHospital` to the `ReferList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ReferList` ADD COLUMN `destinationHospital` VARCHAR(191) NOT NULL,
    MODIFY `status` INTEGER NOT NULL;
