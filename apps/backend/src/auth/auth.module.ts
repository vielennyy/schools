import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/jwt-strategy';
import { GlobalJwtModule } from 'src/jwt/jwt.module';
import { AuthRequestHelper } from './utils/cookie-helper.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [UserModule, PassportModule, GlobalJwtModule],
  providers: [AuthService, JwtStrategy, AuthRequestHelper, MailService],
  controllers: [AuthController],
})
export class AuthModule {}
