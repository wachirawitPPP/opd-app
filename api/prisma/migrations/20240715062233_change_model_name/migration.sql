/*
  Warnings:

  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `customer`;

-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gender` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `religion` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `education` VARCHAR(191) NOT NULL,
    `maritalOption` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NOT NULL,
    `bloodtype` VARCHAR(191) NOT NULL,
    `idCardnumber` VARCHAR(191) NOT NULL,
    `firstnameTH` VARCHAR(191) NOT NULL,
    `lastnameTH` VARCHAR(191) NOT NULL,
    `firstnameEN` VARCHAR(191) NOT NULL,
    `lastnameEN` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `provinceId` INTEGER NOT NULL,
    `amphur` VARCHAR(191) NOT NULL,
    `amphurId` INTEGER NOT NULL,
    `tambon` VARCHAR(191) NOT NULL,
    `tambonId` INTEGER NOT NULL,
    `zipcode` VARCHAR(191) NOT NULL,
    `mainTreatmentRights` VARCHAR(191) NOT NULL,
    `secondaryTreatmentRights` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
