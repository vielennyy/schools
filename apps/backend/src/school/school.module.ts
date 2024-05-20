import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  controllers: [SchoolController],
  providers: [SchoolService, PrismaService, JwtGuard],
})
export class SchoolModule {}
