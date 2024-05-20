/*
  Warnings:

  - A unique constraint covering the columns `[homeroom_teacher_id]` on the table `class` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "class_homeroom_teacher_id_key" ON "class"("homeroom_teacher_id");
