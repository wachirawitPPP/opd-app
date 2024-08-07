/*
  Warnings:

  - Added the required column `congenitalDisease` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drugAllergy` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainTreatmentRights` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mentalhealth` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondaryTreatmentRights` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Customer` ADD COLUMN `congenitalDisease` VARCHAR(191) NOT NULL,
    ADD COLUMN `drugAllergy` VARCHAR(191) NOT NULL,
    ADD COLUMN `mainTreatmentRights` VARCHAR(191) NOT NULL,
    ADD COLUMN `mentalhealth` VARCHAR(191) NOT NULL,
    ADD COLUMN `secondaryTreatmentRights` VARCHAR(191) NOT NULL;
