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

  @Get("by-subject/:id")
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'get by subject id' })
  @ApiOkResponse({
    // type: CreateQuizDto,
  })
  getAllQuizzesBySubjectId(@Param('id') id: string) {
    return this.quizService.getAllQuizzesBySubjectId(id);
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

  @Get('quiz-score/:quizid')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'get  quiz with question by quiz id' })
  @ApiOkResponse({
    // type: CreateQuizDto,
  })
  @ApiParam({ name: 'quizid', type: 'string' })
  calculateScore(@Param('quizid') id: string, @UserDec() user: any) {
    return this.quizService.calculateScore(user.id, id);
  }

  @Get('answered/:quizid')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.STUDENT)
  @ApiOperation({ summary: 'get information if student answers on quiz exist by quiz id' })
  @ApiOkResponse({
    type: Boolean,
  })
  @ApiParam({ name: 'quizid', type: 'string'})
  isAnsweredByStudent(@UserDec() user: any, @Param('quizid') quizid: string) {
    return this.quizService.isAnsweredByStudent(user.id, quizid);
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
