import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Role, User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { ActivateTeacherDto } from './dto/activate-teacher.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from './dto/response.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.user.findMany();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async createStudent(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        userRoles: { create: { role: Role.STUDENT } },
        isActive: true,
      },
    });

    try {
      await this.prismaService.student.create({
        data: {
          user: { connect: { id: user.id } },
        },
      });
    } catch (error) {
      console.error('Failed to create student:', error);
      throw new Error('Student creation failed');
    }

    return user;
  }

  async createDirector(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        isActive: false,
        userRoles: {
          create: [{ role: Role.TEACHER }, { role: Role.DIRECTOR }],
        },
      },
    });

    const existingTeacher = await this.prismaService.teacher.findUnique({
      where: { userId: user.id },
    });

    if (existingTeacher) {
      throw new Error('Teacher with this user ID already exists');
    }

    try {
      await this.prismaService.teacher.create({
        data: {
          user: { connect: { id: user.id } },
        },
      });
    } catch (error) {
      console.error('Failed to create teacher:', error);
      throw new Error('Teacher creation failed');
    }

    return user;
  }

  async createTeacher(
    createTeacherDto: CreateTeacherDto,
    directorId: string,
  ): Promise<User> {
    const school = await this.prismaService.school.findUnique({
      where: { directorId: directorId },
    });

    const user = await this.prismaService.user.create({
      data: {
        ...createTeacherDto,
        userRoles: { create: { role: Role.TEACHER } },
        isActive: false,
        school: { connect: { id: school?.id } },
      },
    });

    try {
      await this.prismaService.teacher.create({
        data: {
          user: { connect: { id: user.id } },
        },
      });
    } catch (error) {
      console.error('Failed to create teacher:', error);
      throw new Error('Teacher creation failed');
    }

    return user;
  }

  async activateTeacher(activateTeacherDto: ActivateTeacherDto): Promise<User> {
    console.log(activateTeacherDto)
    const userId = await this.findUserIdByVerificationToken(
      activateTeacherDto.verificationToken!
    );
    console.log(userId)
    if (!userId) {
      throw new NotFoundException();
    }

    const hashedPassword = await bcrypt.hash(activateTeacherDto.password!, 10);
    this.deleteVerificationToken(activateTeacherDto.verificationToken!);

    return this.prismaService.user.update({
      where: { id: userId },
      data: {
        firstName: activateTeacherDto.firstName,
        lastName: activateTeacherDto.lastName,
        password: hashedPassword,
        isActive: true,
      },
    });
  }

  async findUserIdByVerificationToken(token: string): Promise<string | null> {
    const verificationToken =
      await this.prismaService.verificationToken.findUnique({
        where: { token: token },
      });

    return verificationToken?.userId ? verificationToken?.userId : null;
  }

  async deleteVerificationToken(token: string): Promise<void> {
    const tokenExists = await this.prismaService.verificationToken.findUnique({
      where: { token },
    });

    if (!tokenExists) {
      console.error(`Verification token ${token} not found`);
      throw new NotFoundException('Verification token not found');
    }

    try {
      await this.prismaService.verificationToken.deleteMany({
        where: { token },
      });
    } catch (error) {
      console.error(`Error deleting verification token ${token}:`, error);
      throw new Error(`Failed to delete verification token ${token}`);
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async findUserById(id: string): Promise<ResponseUserDto | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
      include: { userRoles: true },
    });

    return plainToInstance(ResponseUserDto, user);
  }
}
