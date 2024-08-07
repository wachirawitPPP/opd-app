/*
  Warnings:

  - Added the required column `hn` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `hn` VARCHAR(191) NOT NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `province` VARCHAR(191) NULL,
    MODIFY `amphur` VARCHAR(191) NULL,
    MODIFY `tambon` VARCHAR(191) NULL;
