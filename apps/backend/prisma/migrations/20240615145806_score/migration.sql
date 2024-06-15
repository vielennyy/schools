/*
  Warnings:

  - Made the column `score` on table `question` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "answer" ADD COLUMN     "score" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "question" ALTER COLUMN "score" SET NOT NULL,
ALTER COLUMN "score" SET DEFAULT 0;
