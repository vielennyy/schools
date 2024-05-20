import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}
  findAllByClassId(id: string) {
    return this.prismaService.student.findMany({
      where: { classId: id },
      include: { user: true },
    });
  }
}
