/*
  Warnings:

  - You are about to drop the column `order` on the `class` table. All the data in the column will be lost.
  - Added the required column `title` to the `class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "class" DROP COLUMN "order",
ADD COLUMN     "title" TEXT NOT NULL;
