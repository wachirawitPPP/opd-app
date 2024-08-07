-- AlterTable
ALTER TABLE `ReferList` MODIFY `status` INTEGER NULL,
    MODIFY `department` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `departmentId` INTEGER NOT NULL DEFAULT 0,
    MODIFY `originHospital` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `destinationHospital` VARCHAR(191) NOT NULL DEFAULT '';
