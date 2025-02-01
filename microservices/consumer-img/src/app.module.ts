import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { MinioModule } from './minio/minio.module';
import { validate } from '../config/validation/env.validation';
import kafkaConfig from '../config/kafka.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, kafkaConfig],

      validate,
    }),
    MinioModule,
  ],
})
export class AppModule {}
