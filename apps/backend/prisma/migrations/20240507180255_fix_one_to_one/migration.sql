-- DropForeignKey
ALTER TABLE "school" DROP CONSTRAINT "school_director_id_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "schoolId" TEXT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "school"("id") ON DELETE SET NULL ON UPDATE CASCADE;
