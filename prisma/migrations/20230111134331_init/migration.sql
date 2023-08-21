/*
  Warnings:

  - You are about to drop the `ItemGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RequestItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RequestItemComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RequestItemSubComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ItemGroup` DROP FOREIGN KEY `ItemGroup_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `ProjectUser` DROP FOREIGN KEY `ProjectUser_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `ProjectUser` DROP FOREIGN KEY `ProjectUser_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `RequestItem` DROP FOREIGN KEY `RequestItem_item_group_id_fkey`;

-- DropForeignKey
ALTER TABLE `RequestItem` DROP FOREIGN KEY `RequestItem_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `RequestItem` DROP FOREIGN KEY `RequestItem_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `RequestItemComment` DROP FOREIGN KEY `RequestItemComment_request_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `RequestItemSubComment` DROP FOREIGN KEY `RequestItemSubComment_parent_comment_id_fkey`;

-- DropTable
DROP TABLE `ItemGroup`;

-- DropTable
DROP TABLE `Project`;

-- DropTable
DROP TABLE `ProjectUser`;

-- DropTable
DROP TABLE `RequestItem`;

-- DropTable
DROP TABLE `RequestItemComment`;

-- DropTable
DROP TABLE `RequestItemSubComment`;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_nr` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
