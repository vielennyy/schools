-- CreateTable
CREATE TABLE "quiz_result" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "score" INTEGER DEFAULT 0,

    CONSTRAINT "quiz_result_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quiz_result" ADD CONSTRAINT "quiz_result_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_result" ADD CONSTRAINT "quiz_result_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
