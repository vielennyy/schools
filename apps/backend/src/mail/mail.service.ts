import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigType } from '@nestjs/config';
import config from '../config/appconfig';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(config.KEY)
    private readonly configObject: ConfigType<typeof config>,
  ) {}

  async sendVerificationMail(verificationToken: string, email: string) {
    const confirmation_url = `${this.configObject.FRONTEND_URL}/registration?token=${verificationToken}`;
    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <support@example.com>',
      subject: 'Welcome to SchoolHelper! Confirm your Email',
      template: './teacher-activate-account',
      context: {
        confirmation_url,
      },
    });
  }

  async sendDirectorWasCreatedMail(userId: string) {
    await this.mailerService.sendMail({
      to: `${this.configObject.ADMIN_EMAIL}`,
      from: '"Support Team" <support@example.com>',
      subject: 'SchoolHelper! Director was added',
      template: './director-account-needed-activate',
      context: {
        user_id: userId,
      },
    });
  }

  async sendInviteStudentToClassMail(
    inventionId: string,
    studentEmail: string,
  ) {
    await this.mailerService.sendMail({
      to: `${studentEmail}`,
      from: '"Support Team" <support@example.com>',
      subject: 'SchoolHelper! Invitation to class',
      template: './student-invite-to-class',
      context: {
        confirmation_url: `${this.configObject.BACKEND_URL}/invite/student/accept/${inventionId}`,
      },
    });
  }
}
