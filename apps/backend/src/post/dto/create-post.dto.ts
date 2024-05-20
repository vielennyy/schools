import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'What is the right way to read books',
    description: 'Post title',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'What is the right way to read books',
    description: 'I’m going to tell you about the magic trick I stu....',
  })
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    example: 'post-image-12345',
    description: 'S3 key for user avatar image',
  })
  @IsOptional()
  imageKey?: string;
}
