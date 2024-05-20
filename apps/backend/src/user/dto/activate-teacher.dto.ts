import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class ActivateTeacherDto extends PartialType(
  OmitType(CreateUserDto, ['email'] as const),
) {
  @ApiProperty({
    example: 'dba884f9-2cdb-433e-8fac-183a3f176617',
    description: 'Tocken for activate teacher',
  })
  @IsString()
  verificationToken?: string;
}
