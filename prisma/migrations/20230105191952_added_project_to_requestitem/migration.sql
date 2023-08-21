/*
  Warnings:

  - Added the required column `project_id` to the `RequestItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `RequestItem` ADD COLUMN `project_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `RequestItem` ADD CONSTRAINT `RequestItem_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
