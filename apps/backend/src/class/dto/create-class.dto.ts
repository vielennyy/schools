import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({
    example: '7-A',
    description: 'Title',
  })
  @IsNotEmpty()
  title: string;
}
