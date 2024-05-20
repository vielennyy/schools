import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors({ origin: true, credentials: true });
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('School helper')
    .setDescription('The school-helper API description')
    .setVersion('1.0')
    .addTag('school-helper')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('BACKEND_PORT') || 3000);
}
bootstrap();
