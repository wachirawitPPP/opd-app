-- AlterTable
ALTER TABLE `User` MODIFY `isActive` BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `Hostpitals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
