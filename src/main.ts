import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RABBITMQ_QUEUE_NAME, RABBITMQ_URL } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rabbitMq = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: RABBITMQ_QUEUE_NAME,
      queueOptions: {
        durable: false
      }
    }
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();
