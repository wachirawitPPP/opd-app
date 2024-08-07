/*
  Warnings:

  - You are about to drop the column `createdDate` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedDate` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `createdDate` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `updatedDate` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `createdDate` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `tanbonId` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `updatedDate` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `createdDate` on the `ReferList` table. All the data in the column will be lost.
  - You are about to drop the column `updatedDate` on the `ReferList` table. All the data in the column will be lost.
  - You are about to drop the column `createdDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Received` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `testTable` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ReferList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `createdDate`,
    DROP COLUMN `updatedDate`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Department` DROP COLUMN `createdDate`,
    DROP COLUMN `updatedDate`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Hospital` DROP COLUMN `createdDate`,
    DROP COLUMN `tanbonId`,
    DROP COLUMN `updatedDate`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `tambonId` INTEGER NOT NULL DEFAULT 1001001,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `ReferList` DROP COLUMN `createdDate`,
    DROP COLUMN `updatedDate`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `createdDate`,
    DROP COLUMN `updatedDate`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `Received`;

-- DropTable
DROP TABLE `testTable`;
