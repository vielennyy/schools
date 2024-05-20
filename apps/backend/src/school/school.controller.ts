import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { UserDec } from 'src/decorators/user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBody,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { SchoolDto } from './dto/school.dto';
import { ResponseUserDto } from 'src/user/dto/response.dto';

@ApiTags('School Endpoints')
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.DIRECTOR)
  @ApiOperation({ summary: 'Create school' })
  @ApiOkResponse({
    type: SchoolDto,
  })
  @ApiBody({ type: CreateSchoolDto })
  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto, @UserDec() user: any) {
    return this.schoolService.createSchool(createSchoolDto, user.id);
  }

  @UseGuards(JwtGuard)
  @Get()
  @ApiOperation({ summary: 'Create school' })
  @ApiOkResponse({
    type: SchoolDto,
  })
  findOne(@UserDec() user: any) {
    return this.schoolService.findOneByUserId(user.id);
  }

  @UseGuards(JwtGuard)
  @Get('teachers/by-school/:id')
  @ApiOperation({ summary: 'Return all school teacher school' })
  @ApiOkResponse({
    type: ResponseUserDto,
  })
  @ApiParam({
    name: 'id',
    description: 'School id',
    example: 'f2a720fe-275e-47e4-b10c-b0e00f5862e7',
  })
  findAllTeacherBySchoolId(@Param('id') id: string) {
    return this.schoolService.findAllTeacherBySchoolId(id);
  }

  @Get('/all')
  @ApiOperation({ summary: 'Get all school' })
  @ApiOkResponse({
    type: SchoolDto,
    isArray: true,
  })
  findAllSchool() {
    return this.schoolService.findAll();
  }
}
