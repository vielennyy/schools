import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Exclude, Expose, Transform, plainToInstance } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

class RoleDTO {
  @Exclude()
  id: string;
  role: Role;
  @Exclude()
  userId: string;
}
export class ResponseUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: '1ae9d47f-77ac-4b12-beb4-ee4edd415399',
    description: 'User id',
  })
  id: string;
  @ApiProperty({
    example: '1ae9d47f-77ac-4b12-beb4-ee4edd415385',
    description: 'googleId',
  })
  googleId?: string;
  @ApiProperty({
    example: '1ae9d47f-77ac-4b12-f4f8-ee4edd415385.png',
    description: 'avatar key in MINIO',
  })
  avatarKey?: string;
  @ApiProperty({
    example: 'true',
    description: 'is Active',
  })
  isActive: boolean;
  @ApiProperty({
    example: 'd253910c-4ef4-4527-99db-9b7fe10bd6eb',
    description: 'schoolId',
  })
  schoolId?: string;
  @Expose()
  @Transform(({ value }) => {
    return plainToInstance(RoleDTO, value);
  })
  @ApiProperty({
    example: '[{role: Admin}]',
    description: 'User roles',
    isArray: true,
    enum: Role,
  })
  userRoles: Role[];
}
