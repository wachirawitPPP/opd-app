/*
  Warnings:

  - You are about to drop the column `description` on the `Hostpitals` table. All the data in the column will be lost.
  - Added the required column `createdDate` to the `Hostpitals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `Hostpitals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Hostpitals` DROP COLUMN `description`,
    ADD COLUMN `HNCode` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `address` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `amphur` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `amphurId` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `createdDate` DATETIME(3) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `image` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `isActive` TINYINT NOT NULL DEFAULT 1,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `province` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `provinceId` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `referCode` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `serviceDesc` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `tambon` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `tanbonId` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `updatedDate` DATETIME(3) NOT NULL,
    ADD COLUMN `zipCode` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `hospitalCode` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `licenseNumber` VARCHAR(191) NOT NULL DEFAULT '';
