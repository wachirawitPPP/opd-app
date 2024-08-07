/*
  Warnings:

  - Made the column `departmentId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `hospitalId` INTEGER NULL,
    ADD COLUMN `isActive` BOOLEAN NULL,
    MODIFY `departmentId` INTEGER NOT NULL;
