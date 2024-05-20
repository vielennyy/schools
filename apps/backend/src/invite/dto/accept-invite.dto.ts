import { ApiProperty } from '@nestjs/swagger';

export class AcceptClassInviteDto {
  @ApiProperty({
    example: '2345678-1234-1234-1234-123456789012',
    description: 'Unique identifier for the invite',
  })
  id: string;
}
