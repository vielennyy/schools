import { ApiProperty } from '@nestjs/swagger';

export class ResponseSubjectDto {
  @ApiProperty({
    example: '27bec31a-5cc6-4c63-94dd-23f5ac493cc6',
    description: 'Subject id',
  })
  id: string;
  @ApiProperty({
    example: 'Physics',
    description: 'Subject title',
  })
  title: string;
  @ApiProperty({
    example: 'Physics',
    description: '27bec31a-5cc6-4c63-94dd-23f5ac493bbb',
  })
  teacherId: string;
//   @ApiProperty({
//     example: '7 class',
//     description: 'classId',
//   })
//   classId: string;
}