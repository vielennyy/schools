import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { connect } from 'http2';

@Injectable()
export class SubjectService {
  
  constructor(private readonly prismaService: PrismaService) {}
  async create(createSubjectDto: CreateSubjectDto, userId: string) {
    const teacher = await this.prismaService.teacher.findFirst({
      where: { userId: userId },
    });

    return this.prismaService.subject.create({
      data: { title: createSubjectDto.title, teacher: { connect: { id: teacher!.id} }, class: {connect: {id: createSubjectDto!.classId}} }
    })
  }

  async findAll() {
    return this.prismaService.subject.findMany();
  }

  async findAllTeachersSubject(userId: string) {
    const teacher = await this.prismaService.teacher.findUnique({
      where: { userId: userId },
    });
    return this.prismaService.subject.findMany({where: {teacherId: teacher?.id}});
  }

  async getAllSubjectByClassId(classId: string){
    return this.prismaService.subject.findMany({where: {classId: classId}});
  }

  async getAllByUserId(userId: string){
    const student = await this.prismaService.student.findFirst({where: {userId: userId}})
    if(!student || ! student.classId)
      {
        return;
      }
    return this.prismaService.subject.findMany({where: {classId: student.classId}});
  }
}
