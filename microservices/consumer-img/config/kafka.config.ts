// src/config/kafka.config.ts
import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export default registerAs('kafka', () => ({
  config: {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID || 'my-group-id',
      },
    },
}}));
