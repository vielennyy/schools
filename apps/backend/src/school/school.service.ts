import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundError } from 'rxjs';
import { SchoolDto } from './dto/school.dto';
import { Role } from '@prisma/client';

@Injectable()
export class SchoolService {
  constructor(private readonly prismaService: PrismaService) {}
  async createSchool(
    createSchoolDto: CreateSchoolDto,
    directorId: string,
  ): Promise<SchoolDto> {
    const school = await this.prismaService.school.create({
      data: { ...createSchoolDto, directorId: directorId },
    });
    await this.prismaService.user.update({
      where: { id: directorId },
      data: { school: { connect: { id: school.id } } },
    });

    return school;
  }

  async findOneByUserId(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
      include: { school: true },
    });
    console.log(user)
    if (!user || !user.school) {
      return NotFoundException;
    }
    return await this.prismaService.school.findUnique({
      where: { id: user.school.id },
    });
  }

  async findAll() {
    return await this.prismaService.school.findMany({});
  }

  async findAllTeacherBySchoolId(id: string) {
    const user = await this.prismaService.user.findMany({
      include: { userRoles: true },
      where: { schoolId: id, isActive: true },
    });
    if (!user) {
      throw NotFoundError;
    }

    return user.filter((u) =>
      u.userRoles.map((r) => r.role).includes(Role.TEACHER),
    );
  }
}
