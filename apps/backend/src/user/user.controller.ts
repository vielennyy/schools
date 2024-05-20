import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { JwtGuard as JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserDec } from 'src/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { ApiOperation, ApiOkResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { VerificationTokenService } from 'src/verification-token/verification-token.service';
import { ActivateTeacherDto } from './dto/activate-teacher.dto';
import { MailService } from 'src/mail/mail.service';

@ApiTags('User Endpoints')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly verificationTokenService: VerificationTokenService,
    private readonly mailService: MailService,
  ) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.DIRECTOR)
  @ApiOperation({ summary: 'Create teacher' })
  @ApiOkResponse({
    type: CreateUserDto,
  })
  @ApiBody({ type: CreateTeacherDto, isArray: true })
  @Post('create/teacher')
  async createTeacher(
    @UserDec() director: any,
    @Body() createTeacherDtos: CreateTeacherDto[],
  ) {
    createTeacherDtos.map(async (createTeacherDto) => {
      const user = await this.userService.createTeacher(
        createTeacherDto,
        director.id,
      );
      const token = await this.verificationTokenService.create(user.id);
      this.mailService.sendVerificationMail(token, createTeacherDto.email);
      return user;
    });
  }

  @ApiOperation({ summary: 'Activate teacher' })
  @ApiOkResponse({
    type: ActivateTeacherDto,
  })
  @ApiBody({ type: ActivateTeacherDto })
  @Post('activate/teacher')
  async activateTeacher(@Body() createTeacherDto: ActivateTeacherDto) {
    return this.userService.activateTeacher(createTeacherDto);
  }

  @UseGuards(JwtGuard)
  @Patch()
  updateUser(@UserDec() user: any, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(user.id, updateUserDto);
  }
}
