-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('SINGLE', 'MULTIPLE', 'FREE_ANSWER');

-- CreateTable
CREATE TABLE "quiz" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,

    CONSTRAINT "quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "answer_options" TEXT NOT NULL,
    "question_type" "QuestionType" NOT NULL,
    "quiz_id" TEXT NOT NULL,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answer" (
    "id" TEXT NOT NULL,
    "student_id" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quiz_creator_id_key" ON "quiz"("creator_id");

-- CreateIndex
CREATE UNIQUE INDEX "question_answer_options_key" ON "question"("answer_options");

-- CreateIndex
CREATE UNIQUE INDEX "question_quiz_id_key" ON "question"("quiz_id");

-- CreateIndex
CREATE UNIQUE INDEX "answer_student_id_key" ON "answer"("student_id");

-- CreateIndex
CREATE UNIQUE INDEX "answer_quiz_id_key" ON "answer"("quiz_id");

-- CreateIndex
CREATE UNIQUE INDEX "answer_question_id_key" ON "answer"("question_id");

-- CreateIndex
CREATE UNIQUE INDEX "answer_create_at_key" ON "answer"("create_at");

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
