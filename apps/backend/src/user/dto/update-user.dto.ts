import { PartialType, OmitType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'email'] as const),
) {
  @ApiProperty({
    example: 'user-avatar-12345',
    description: 'S3 key for user avatar image',
  })
  @IsOptional()
  @IsString()
  avatarKey?: string;

  @ApiProperty({
    example: 'User surname',
    description: 'Petrovich',
  })
  @IsOptional()
  @IsString()
  surname?: string;

  @ApiProperty({
    example: 'User phone number',
    description: '+380900000000',
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
