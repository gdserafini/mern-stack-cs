/*
  Warnings:

  - Added the required column `banner` to the `New` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `New` ADD COLUMN `banner` VARCHAR(191) NOT NULL;
