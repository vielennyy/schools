import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBody,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserDec } from 'src/decorators/user.decorator';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { ResponseQuestionDto } from './dto/student-answer.dto';

@ApiTags('Quiz Endpoints')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.TEACHER)
  @ApiOperation({ summary: 'Create quiz' })
  @ApiOkResponse({
    type: CreateQuizDto,
  })
  @ApiBody({ type: CreateQuizDto })
  @Post()
  createQuiz(@UserDec() user: any, @Body() createQuizDto: CreateQuizDto) {
    console.log(user);
    return this.quizService.createQuiz(user.id, createQuizDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'get all quizzes' })
  @ApiOkResponse({
    // type: CreateQuizDto,
  })
  getAllQuizzes() {
    return this.quizService.getAllQuizzes();
  }

  @Get('for-student/:id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'get  quiz with question by quiz id' })
  @ApiOkResponse({
    // type: CreateQuizDto,
  })
  @ApiParam({ name: 'id', type: 'string' })
  getQuizWithQuestion(@Param('id') id: string) {
    return this.quizService.getQuizWithQuestion(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.TEACHER)
  @ApiOperation({ summary: 'Create quiz question' })
  @ApiOkResponse({
    type: CreateQuizQuestionDto,
  })
  @ApiBody({ type: CreateQuizQuestionDto })
  @Post('question')
  createQuizQuestion(
    @UserDec() user: any,
    @Body() createQuizDto: CreateQuizQuestionDto,
  ) {
    return this.quizService.createQuizQuestion(createQuizDto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.STUDENT)
  @ApiOperation({ summary: 'Set quiz question answer' })
  @ApiOkResponse({
    type: ResponseQuestionDto,
  })
  @ApiBody({ type: ResponseQuestionDto })
  @Post('question/answer')
  createQuizQuestionAnswer(
    @UserDec() user: any,
    @Body() responseQuestion: ResponseQuestionDto,
  ) {
    return this.quizService.createQuestionAnswerBy(user.id, responseQuestion);
  }
}
