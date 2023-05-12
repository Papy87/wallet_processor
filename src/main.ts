import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}`,
      ],
      queue: process.env.RABBITMQ_QUEUE_NAME,
      noAck: false,
      prefetchCount: 1,
      queueOptions: {
        durable: false,
      },
    },
  });

  app.startAllMicroservices();
}
bootstrap();
