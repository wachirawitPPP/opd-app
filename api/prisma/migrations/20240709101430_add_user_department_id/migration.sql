/*
  Warnings:

  - Made the column `hospitalId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isActive` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Department` DROP FOREIGN KEY `Department_hospitalId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `hospitalId` INTEGER NOT NULL,
    MODIFY `isActive` BOOLEAN NOT NULL;
