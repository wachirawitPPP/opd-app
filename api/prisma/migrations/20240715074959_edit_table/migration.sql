/*
  Warnings:

  - Added the required column `updatedDate` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `ReferList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedDate` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isRefer` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updatedDate` DATETIME(3) NOT NULL,
    MODIFY `provinceId` INTEGER NOT NULL DEFAULT 1,
    MODIFY `amphurId` INTEGER NOT NULL DEFAULT 1001,
    MODIFY `tambonId` INTEGER NOT NULL DEFAULT 1001001;

-- AlterTable
ALTER TABLE `Department` ADD COLUMN `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Hospital` MODIFY `amphurId` INTEGER NOT NULL DEFAULT 1001,
    MODIFY `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `provinceId` INTEGER NOT NULL DEFAULT 1,
    MODIFY `tanbonId` INTEGER NOT NULL DEFAULT 1001001;

-- AlterTable
ALTER TABLE `ReferList` ADD COLUMN `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedDate` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedDate` DATETIME(3) NOT NULL;
