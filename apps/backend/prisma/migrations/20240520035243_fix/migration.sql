/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `invitation_to_class` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "invitation_to_class_id_key" ON "invitation_to_class"("id");
