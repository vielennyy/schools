import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseQuestionDto } from './dto/student-answer.dto';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { plainToInstance } from 'class-transformer';
import { StudentQuizWithQuestionDto } from './dto/student-quiz-with-question.dto';

@Injectable()
export class QuizService {
  constructor(private readonly prismaService: PrismaService) {}
  async createQuiz(userId: string, createQuizDto: CreateQuizDto) {
    const teacher = await this.prismaService.teacher.findUnique({
      where: { userId: userId },
    });

    return this.prismaService.quiz.create({
      data: { 
        title: createQuizDto.title, 
        creator: { connect: { id: teacher?.id } },
        subject: { connect: { id: createQuizDto?.subjectId}},
       },
    });
  }

  async getAllQuizzes() {
    return this.prismaService.quiz.findMany();
  }

  async getAllQuizzesBySubjectId(subjectId: string) {
    return this.prismaService.quiz.findMany({ where: { subjectId: subjectId }});
  }

  async getQuizWithQuestion(quizId: string) {
    const quiz = this.prismaService.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true },
    });
    return plainToInstance(StudentQuizWithQuestionDto, quiz);
  }

  async createQuizQuestion(createQuizQuestionDto: CreateQuizQuestionDto) {
    return this.prismaService.question.create({
      data: {
        answer: createQuizQuestionDto.answer,
        answerOptions: createQuizQuestionDto.answerOptions,
        text: createQuizQuestionDto.text,
        questionType: createQuizQuestionDto.questionType,
        quiz: { connect: { id: createQuizQuestionDto.quizId } },
        score: +createQuizQuestionDto.score,
      },
    });
  }

  async createQuestionAnswerBy(
    userId: string,
    responseQuestionDto: ResponseQuestionDto,
  ) {
    const student = await this.prismaService.student.findUnique({
      where: { userId: userId },
    });
    if (!student) {
      return new NotFoundException();
    }
    const question = await this.prismaService.question.findUnique({where: {id: responseQuestionDto.questionId}})
    const score = question?.answer === responseQuestionDto.response ? question.score : 0;

    const studentAnswer =  this.prismaService.studentAnswer.create({
      data: {
        student: { connect: { id: student?.id } },
        question: { connect: { id: responseQuestionDto.questionId } },
        quiz: { connect: { id: responseQuestionDto.quizId } },
        response: responseQuestionDto.response,
        score: score,
      },
    });

    return studentAnswer
  }

  async isAnsweredByStudent(
    userId: string,
    quizId: string,
  ) {
    const student = await this.prismaService.student.findUnique({where: {userId: userId}})
    const answer = await this.prismaService.studentAnswer.findFirst({where: {quizId: quizId, studentId: student?.id}})
    return answer ? true : false
  }

  async calculateScore (
    userId: string,
    quizId: string,
  ){
    if (!await this.isAnsweredByStudent(userId, quizId)) {
      return 0
    }

    const student = await this.prismaService.student.findUnique({where: {userId: userId}})
    const answers = await this.prismaService.studentAnswer.findMany({where: {quizId: quizId, studentId: student?.id}})
    return answers.reduce((acc, currVal) => {
      return acc + (currVal ? currVal.score! : 0)
    }, 0)
  }
}
