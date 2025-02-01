import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';
import { validate } from '../config/validation/env.validation';
import { PdfModule } from './pdf/pdf.module';
import kafkaConfig from '../config/kafka.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, kafkaConfig],

      validate,
    }),
    PdfModule,
  ],
})
export class AppModule {}
