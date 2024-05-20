import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '@prisma/client';

export class CreateQuizQuestionDto {
  @ApiProperty({
    example: '1+1=',
    description: 'Question text',
  })
  text: string;

  @ApiProperty({
    example: '2',
    description: ' The correct answer ',
  })
  answer: string;

  @ApiProperty({
    example: '2,4,8,1',
    description: ' The answer options (They are listed after a comma)',
  })
  answerOptions: string;

  @ApiProperty({
    example: 'SINGLE',
    description: 'Question type',
    enum: QuestionType,
  })
  questionType: QuestionType;

  @ApiProperty({
    example: '830e3783-0e16-4516-8659-040d526e7310',
    description: 'quiz Id',
  })
  quizId: string;

  @ApiProperty({
    example: '10',
    description: 'score',
  })
  score: string;
}
