/*
  Warnings:

  - You are about to drop the column `departmentId` on the `Customer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Customer` DROP FOREIGN KEY `Customer_departmentId_fkey`;

-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `departmentId`;
