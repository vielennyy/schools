import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty({
    example: 'Physics',
    description: 'Subject title',
  })
  title: string;
//   classId: string;
}