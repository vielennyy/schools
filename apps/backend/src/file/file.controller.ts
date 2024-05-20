import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { MinioService } from '../minio/minio.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('File Endpoints')
@Controller('file')
export class FileController {
  constructor(private readonly minioService: MinioService) {}

  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = await this.minioService.upload(file);
    return response;
  }

  @Get(':name')
  @ApiOperation({ summary: 'Get file' })
  @ApiParam({
    name: 'name',
    example: '123e4567-e89b-12d3-a456-426614174000.png',
    description: 'Unique file name.',
  })
  async getFileByName(@Param('name') name: string) {
    const response = await this.minioService.getFileByName(name);
    return response;
  }
}
