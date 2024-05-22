import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubjectService {
  
  constructor(private readonly prismaService: PrismaService) {}
  async create(createSubjectDto: CreateSubjectDto, userId: string) {
    const teacher = await this.prismaService.teacher.findUnique({
      where: { userId: userId },
    });

    return this.prismaService.subject.create({
      data: { ...createSubjectDto, teacher: { connect: { id: teacher!.id} } }
    })
  }

  async findAll() {
    return this.prismaService.subject.findMany();
  }
}
