import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createPostDto: CreatePostDto) {
    return this.prismaService.post.create({ data: { ...createPostDto } });
  }

  findAll() {
    return this.prismaService.post.findMany();
  }
}
