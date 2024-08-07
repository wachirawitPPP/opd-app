-- CreateTable
CREATE TABLE `ReferList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `departmentId` INTEGER NOT NULL,
    `originHospital` VARCHAR(191) NOT NULL,
    `urgent` VARCHAR(191) NOT NULL,
    `referDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `confirmDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `hn` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ReferList_name_key`(`name`),
    UNIQUE INDEX `ReferList_hn_key`(`hn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
