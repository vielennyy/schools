import { ApiProperty } from '@nestjs/swagger';

export class ResponseQuestionDto {
  @ApiProperty({
    example: '6ab79e0e-865c-436c-bded-18ba5765758b',
    description: 'Quiz id',
  })
  quizId: string;

  @ApiProperty({
    example: 'a4f604e1-5582-40c1-beb6-1600a6d89e5e',
    description: 'Question id',
  })
  questionId: string;

  @ApiProperty({
    example: '4',
    description: 'Response id',
  })
  response: string;
}
