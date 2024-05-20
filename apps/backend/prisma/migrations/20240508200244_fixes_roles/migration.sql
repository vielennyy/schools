/*
  Warnings:

  - You are about to drop the column `user_id` on the `user_role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,role]` on the table `user_role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `user_role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_role" DROP CONSTRAINT "user_role_user_id_fkey";

-- DropIndex
DROP INDEX "user_role_user_id_key";

-- AlterTable
ALTER TABLE "user_role" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_role_userId_role_key" ON "user_role"("userId", "role");

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
