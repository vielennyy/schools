import { ApiProperty } from '@nestjs/swagger';
import { ResponseUserDto } from 'src/user/dto/response.dto';

export class ResponseStudentDto {
  @ApiProperty({
    example: '1ae9d75d-77ac-4b12-beb4-ee4edd415399',
    description: 'Student id',
  })
  id: string;
  @ApiProperty({
    example: '1ae9d47f-77ac-4b12-beb4-ee4edd415399',
    description: 'User id',
  })
  userId: string;
  @ApiProperty({
    example: '1ae9d47f-77dd-4n12-beb4-ee4edd415399',
    description: 'Class id',
  })
  classId: string;
  @ApiProperty({
    description: 'User',
  })
  user: ResponseUserDto;
}
