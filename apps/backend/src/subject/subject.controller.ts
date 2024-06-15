import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UserDec } from 'src/decorators/user.decorator';
import { ResponseSubjectDto } from './dto/response-subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.TEACHER)
  @ApiOperation({ summary: 'Create subject' })
  @ApiOkResponse({
    type: CreateSubjectDto
  })
  @ApiBody({ type: CreateSubjectDto})
  create(@UserDec() user: any, @Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto, user.id);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get all subjects' })
  @ApiOkResponse({
    type: ResponseSubjectDto,
    isArray: true,
  })
  getAllSubject() {
    return this.subjectService.findAll();
  }

  @Get('by-class/:id')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get all subjects' })
  @ApiOkResponse({
    type: ResponseSubjectDto,
    isArray: true,
  })
  @ApiParam({ name: 'id', type: 'string' })
  getAllSubjectByClassId(@Param('id') id: string) {
    return this.subjectService.findAll();
  }

  @Get('by-student')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.STUDENT)
  @ApiOperation({ summary: 'Get all subjects' })
  @ApiOkResponse({
    type: ResponseSubjectDto,
    isArray: true,
  })
  getAllSubjectByStudentId(@UserDec() user: any) {

    return this.subjectService.getAllByUserId(user.id);
  }

  @Get('by-teacher')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.TEACHER)
  @ApiOperation({ summary: "Get all teacher's subjects" })
  @ApiOkResponse({
    type: ResponseSubjectDto,
    isArray: true,
  })
  getAllTeachersSubject(@UserDec() user: any) {
    return this.subjectService.findAllTeachersSubject(user.id);
  }
}

