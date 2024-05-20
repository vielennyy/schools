import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateClassInviteDto {
  @ApiProperty({
    example: '2345678-1234-1234-1234-123456789012',
    description: 'Unique identifier for the class',
  })
  @IsNotEmpty()
  classId: string;

  @ApiProperty({
    example: 'student@gmail.com',
    description: 'Email of the student to be invited',
  })
  @IsNotEmpty()
  userEmail: string;
}
