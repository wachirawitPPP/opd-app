-- AddForeignKey
ALTER TABLE `Department` ADD CONSTRAINT `Department_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `Hostpitals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
