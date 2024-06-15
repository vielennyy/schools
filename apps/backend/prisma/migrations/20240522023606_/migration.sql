-- AlterTable
ALTER TABLE "subject" ADD COLUMN     "class_id" TEXT;

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE SET NULL ON UPDATE CASCADE;
