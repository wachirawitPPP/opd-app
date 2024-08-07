/*
  Warnings:

  - You are about to drop the column `birthdate` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `idCardnumber` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `mainTreatmentRights` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `maritalOption` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryTreatmentRights` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `zipcode` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `birthDate` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCardNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maritalOptions` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nickname` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passportNumber` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tag` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tel` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Customer` DROP COLUMN `birthdate`,
    DROP COLUMN `created_at`,
    DROP COLUMN `idCardnumber`,
    DROP COLUMN `mainTreatmentRights`,
    DROP COLUMN `maritalOption`,
    DROP COLUMN `secondaryTreatmentRights`,
    DROP COLUMN `updated_at`,
    DROP COLUMN `zipcode`,
    ADD COLUMN `birthDate` DATETIME(3) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `idCardNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `maritalOptions` VARCHAR(191) NOT NULL,
    ADD COLUMN `nickname` VARCHAR(191) NOT NULL,
    ADD COLUMN `note` VARCHAR(191) NOT NULL,
    ADD COLUMN `passportNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `tag` VARCHAR(191) NOT NULL,
    ADD COLUMN `tel` VARCHAR(191) NOT NULL,
    ADD COLUMN `zipCode` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `Department`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
