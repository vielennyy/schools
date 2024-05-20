import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'User password',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'Tony',
    description: 'User name',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Stark',
    description: 'User lastname',
  })
  @IsNotEmpty()
  lastName: string;
}
