import { Module } from '@nestjs/common';
import { VerificationTokenService } from './verification-token.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [VerificationTokenService, PrismaService],
  exports: [VerificationTokenService],
})
export class VerificationTokenModule {}
