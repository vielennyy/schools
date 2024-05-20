import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({
    example: 'Basic arithmetic operations',
    description: 'Quiz title',
  })
  title: string;
}
