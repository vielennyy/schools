import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'User email',
  })
  @IsEmail()
  email: string;
}
