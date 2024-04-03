/*
  Warnings:

  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_locationId_fkey";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "activities" JSONB[];

-- DropTable
DROP TABLE "Activity";
