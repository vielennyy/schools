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
    console.log(userId);
    const teacher = await this.prismaService.teacher.findUnique({
      where: { userId: userId },
    });

    return this.prismaService.quiz.create({
      data: { ...createQuizDto, creator: { connect: { id: teacher?.id } } },
    });
  }

  async getAllQuizzes() {
    return this.prismaService.quiz.findMany();
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

    return this.prismaService.studentAnswer.create({
      data: {
        student: { connect: { id: student?.id } },
        question: { connect: { id: responseQuestionDto.questionId } },
        quiz: { connect: { id: responseQuestionDto.quizId } },
        response: responseQuestionDto.response,
      },
    });
  }
}
