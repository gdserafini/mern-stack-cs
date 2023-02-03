-- DropIndex
DROP INDEX `New_title_key` ON `New`;

-- AlterTable
ALTER TABLE `New` MODIFY `title` TINYTEXT NOT NULL;
