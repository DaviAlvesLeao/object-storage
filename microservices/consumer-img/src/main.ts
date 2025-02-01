import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const kafkaConfig = configService.get('kafka');

  const kafkaMicroserviceOptions: MicroserviceOptions = kafkaConfig.config;
  app.connectMicroservice(kafkaMicroserviceOptions);

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
