import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MinioController } from './minio.controller';
import { MinioService } from './minio.service';

@Module({
  imports: [ConfigModule],
  controllers: [MinioController],
  providers: [MinioService],
})
export class MinioModule {}
