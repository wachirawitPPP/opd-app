/*
  Warnings:

  - You are about to drop the `Hostpitals` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `departmentId` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalId` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `departmentId` INTEGER NOT NULL,
    ADD COLUMN `hospitalId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Hostpitals`;

-- CreateTable
CREATE TABLE `Hospital` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `hospitalCode` VARCHAR(191) NOT NULL,
    `licenseNumber` VARCHAR(191) NOT NULL,
    `HNCode` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `amphur` VARCHAR(191) NOT NULL,
    `amphurId` INTEGER NOT NULL,
    `createdDate` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `provinceId` INTEGER NOT NULL,
    `referCode` VARCHAR(191) NOT NULL,
    `serviceDesc` VARCHAR(191) NOT NULL,
    `tambon` VARCHAR(191) NOT NULL,
    `tanbonId` INTEGER NOT NULL,
    `updatedDate` DATETIME(3) NOT NULL,
    `zipCode` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Hospital_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Department` ADD CONSTRAINT `Department_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `Hospital`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
