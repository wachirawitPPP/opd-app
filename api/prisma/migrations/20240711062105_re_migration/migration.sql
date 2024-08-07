/*
  Warnings:

  - Added the required column `isActive` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenseNumber` to the `Hostpitals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Department` ADD COLUMN `isActive` TINYINT NOT NULL;

-- AlterTable
ALTER TABLE `Hostpitals` ADD COLUMN `licenseNumber` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `testTable` (
    `id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
