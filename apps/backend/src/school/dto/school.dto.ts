import { ApiProperty } from '@nestjs/swagger';

export class SchoolDto {
  @ApiProperty({
    description: 'Unique identifier for the school',
    example: '12345678-1234-1234-1234-123456789012',
  })
  id: string;

  @ApiProperty({
    description: 'Title of the school',
    example: 'Greenwood High School',
  })
  title: string;

  @ApiProperty({
    description: 'Description of the school',
    example: 'A leading educational institution.',
  })
  description: string;

  @ApiProperty({
    description: 'City where the school is located',
    example: 'New York',
  })
  city: string;

  @ApiProperty({ description: 'Postal index of the city', example: '10001' })
  index: string;

  @ApiProperty({
    description: 'Contact phone number for the school',
    example: '+1-555-555-5555',
  })
  phone: string;

  @ApiProperty({
    description: 'ID of the school director',
    example: '12345678-1234-1234-1234-123456789012',
  })
  directorId: string;
  @ApiProperty({
    description: 'Contact email for the school',
    example: 'myschool@gmail.com',
  })
  email: string | null;
  @ApiProperty({
    description: 'District for the school',
    example: 'Cherkasy',
  })
  district: string | null;
}
