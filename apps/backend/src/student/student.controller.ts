import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ResponseStudentDto } from './dto/responce-student.dto';

@ApiTags('Students endpoints')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('all-by-class/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.TEACHER)
  @ApiOperation({ summary: 'Create quiz' })
  @ApiOkResponse({
    type: ResponseStudentDto,
  })
  getAllBtyClassId(@Param('id') id: string) {
    return this.studentService.findAllByClassId(id);
  }
}
