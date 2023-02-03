-- AlterTable
ALTER TABLE `New` MODIFY `title` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE FULLTEXT INDEX `New_title_idx` ON `New`(`title`);
