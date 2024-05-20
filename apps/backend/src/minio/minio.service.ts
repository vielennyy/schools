import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { Client } from 'minio';
import { ResponseFileDto } from '../file/dto/response-file.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MinioService {
  private minioClient: Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Client({
      endPoint: this.configService.get('MINIO_ENDPOINT') as string,
      port: Number(this.configService.get<number>('MINIO_PORT')),
      useSSL: this.configService.get('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get('MINIO_ACCESS_KEY') as string,
      secretKey: this.configService.get('MINIO_SECRET_KEY') as string,
    });

    this.bucketName = this.configService.get('MINIO_BUCKET_NAME') as string;
  }

  private async isFileExists(name: string): Promise<boolean> {
    try {
      await this.minioClient.statObject(this.bucketName, name);
    } catch (err) {
      throw new NotFoundException('Requested file not found.');
    }

    return true;
  }

  async onModuleInit() {
    const isBucketExist = await this.minioClient.bucketExists(this.bucketName);

    if (!isBucketExist) {
      await this.minioClient.makeBucket(this.bucketName);
      const policy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: {
              AWS: ['*'],
            },
            Action: ['s3:GetObject'],
            Resource: [
              `arn:aws:s3:::${this.configService.get('MINIO_BUCKET_NAME')}`,
              `arn:aws:s3:::${this.configService.get('MINIO_BUCKET_NAME')}/*`,
            ],
          },
        ],
      };

      await this.minioClient.setBucketPolicy(
        this.bucketName,
        JSON.stringify(policy),
      );
    }
  }

  async upload(file: Express.Multer.File): Promise<ResponseFileDto> {
    if (!file) throw new BadRequestException('file must be provided.');

    const allowedTypes = ['image/'];

    if (!allowedTypes.some((format) => file.mimetype.startsWith(format))) {
      throw new BadRequestException('Supports only images.');
    }

    const fileType = file.originalname.split('.').pop();
    const fileName = `${randomUUID()}.${fileType}`;

    await this.minioClient.putObject(this.bucketName, fileName, file.buffer);

    const url = await this.getFileByName(fileName);

    return plainToInstance(ResponseFileDto, { ...url });
  }

  async getFileByName(name: string): Promise<ResponseFileDto> {
    await this.isFileExists(name);

    await this.minioClient.statObject(this.bucketName, name);

    const presignedUrl = await this.minioClient.presignedGetObject(
      this.bucketName,
      name,
    );

    const url = presignedUrl;

    return plainToInstance(ResponseFileDto, { name, url });
  }

  async deleteFileByName(name: string): Promise<void> {
    await this.isFileExists(name);

    await this.minioClient.statObject(this.bucketName, name);
    await this.minioClient.removeObject(this.bucketName, name);
  }

  async uploadByUrl(imageUrl: string): Promise<ResponseFileDto> {
    let response: Response;

    try {
      response = await fetch(imageUrl);
    } catch (err) {
      throw new BadRequestException('Invalid image url.');
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    const fileType = response.headers.get('content-type')!.split('/').pop();
    const fileName = `${randomUUID()}.${fileType}`;

    await this.minioClient.putObject(this.bucketName, fileName, buffer);

    const url = await this.getFileByName(fileName);

    return plainToInstance(ResponseFileDto, { name: fileName, url: url.url });
  }
}
