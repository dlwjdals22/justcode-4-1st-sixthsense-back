/*
  Warnings:

  - You are about to drop the column `create_at` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `cities` table. All the data in the column will be lost.
  - You are about to drop the column `dormitory_id` on the `cities` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `districts` table. All the data in the column will be lost.
  - You are about to drop the column `dormitory_id` on the `districts` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `dormitories` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `dormitories_images` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `recommend_places` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `rooms_images` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `rooms_specials` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `users_dormitories_like` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `cities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `districts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city_id` to the `dormitories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district_id` to the `dormitories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cities` DROP FOREIGN KEY `cities_dormitory_id_fkey`;

-- DropForeignKey
ALTER TABLE `districts` DROP FOREIGN KEY `districts_dormitory_id_fkey`;

-- AlterTable
ALTER TABLE `categories` DROP COLUMN `create_at`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `cities` DROP COLUMN `create_at`,
    DROP COLUMN `dormitory_id`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `districts` DROP COLUMN `create_at`,
    DROP COLUMN `dormitory_id`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `dormitories` DROP COLUMN `create_at`,
    ADD COLUMN `city_id` INTEGER NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `district_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `dormitories_images` DROP COLUMN `create_at`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `recommend_places` DROP COLUMN `create_at`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `rooms` DROP COLUMN `create_at`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `rooms_images` DROP COLUMN `create_at`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `rooms_specials` DROP COLUMN `create_at`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `users` DROP COLUMN `create_at`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `users_dormitories_like` DROP COLUMN `create_at`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `cities_name_key` ON `cities`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `districts_name_key` ON `districts`(`name`);

-- AddForeignKey
ALTER TABLE `dormitories` ADD CONSTRAINT `dormitories_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dormitories` ADD CONSTRAINT `dormitories_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `districts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
