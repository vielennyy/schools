import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { VerificationTokenService } from '../verification-token/verification-token.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    JwtGuard,
    VerificationTokenService,
    MailService,
  ],
  exports: [UserService],
})
export class UserModule {}
