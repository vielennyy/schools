import { ApiProperty } from '@nestjs/swagger';
import { StudentQuizQuestionDto } from './response-quiz-question.dto';

export class StudentQuizWithQuestionDto {
  @ApiProperty({
    example: 'Basic arithmetic operations',
    description: 'Quiz title',
  })
  creatorId: string;
  title: string;
  @ApiProperty({
    description: 'Quiz questions',
    isArray: true,
  })
  questions: StudentQuizQuestionDto[];
}
