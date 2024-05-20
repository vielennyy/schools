import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VerificationTokenService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(userId: string): Promise<string> {
    const verificationToken = await this.prismaService.verificationToken.create(
      {
        data: { user: { connect: { id: userId } } },
      },
    );
    return verificationToken.token;
  }
}
