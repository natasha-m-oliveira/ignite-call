/*
  Warnings:

  - Added the required column `street_number` to the `schedulings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip_code` to the `schedulings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `schedulings` ADD COLUMN `street_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `zip_code` VARCHAR(191) NOT NULL;
