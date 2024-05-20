import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { MinioModule } from '../minio/minio.module';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  imports: [MinioModule],
  controllers: [FileController],
  providers: [JwtGuard],
})
export class FileModule {}
