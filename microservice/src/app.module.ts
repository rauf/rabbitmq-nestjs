import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TaskService } from './Task.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { RABBITMQ_QUEUE_NAME, RABBITMQ_URL } from './constants';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
    {
      name: 'RabbitClient',
      transport: Transport.RMQ,
      options: {
        urls: [RABBITMQ_URL],
        queue: RABBITMQ_QUEUE_NAME,
        queueOptions: {
          durable: false
        }
      }
    }
  ])],
  controllers: [AppController],
  providers: [TaskService],
})
export class AppModule {}
