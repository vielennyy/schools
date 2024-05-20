-- CreateTable
CREATE TABLE "invitation_to_class" (
    "id" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "invitation_to_class_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invitation_to_class_studentId_key" ON "invitation_to_class"("studentId");

-- AddForeignKey
ALTER TABLE "invitation_to_class" ADD CONSTRAINT "invitation_to_class_classId_fkey" FOREIGN KEY ("classId") REFERENCES "class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation_to_class" ADD CONSTRAINT "invitation_to_class_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
