import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { InviteService } from './invite.service';
import { CreateClassInviteDto } from './dto/create-invite.dto';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBody,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { MailService } from 'src/mail/mail.service';
import { ResponseStudentDto } from 'src/student/dto/responce-student.dto';

@Controller('invite')
@ApiTags('Invite endpoints')
export class InviteController {
  constructor(
    private readonly inviteService: InviteService,
    private readonly mailService: MailService,
  ) {}

  @Post('student')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.TEACHER)
  @ApiOperation({ summary: 'Invite student into the class' })
  @ApiOkResponse({
    type: CreateClassInviteDto,
  })
  @ApiBody({ type: CreateClassInviteDto, isArray: true })
  async inviteStudent(@Body() createInviteDtos: CreateClassInviteDto[]) {
    console.log(createInviteDtos);
    return createInviteDtos.map(async (createInviteDto) => {
      const invitation = await this.inviteService.create(createInviteDto);
      this.mailService.sendInviteStudentToClassMail(
        invitation.id,
        createInviteDto.userEmail,
      );
      return invitation;
    });
  }

  @Get('student/accept/:id')
  @ApiOperation({ summary: 'Accept invite into' })
  @ApiOkResponse({
    type: CreateClassInviteDto,
  })
  @ApiParam({ name: 'id', type: 'string' })
  async acceptInviteStudent(@Param('id') id: string) {
    const invitation = await this.inviteService.acceptById(id);
    return invitation;
  }

  @Get('pending/:id')
  @ApiOperation({ summary: 'Get all pending Invite by class id' })
  @ApiOkResponse({
    type: ResponseStudentDto,
  })
  @ApiParam({ name: 'id', type: 'string' })
  async getPendingInviteUser(@Param('id') id: string) {
    const students = await this.inviteService.getPendingInviteUser(id);
    return students;
  }
}
