import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ScheduleModule } from '@nestjs/schedule';
import { EXCHANGE_NAME, RABBITMQ_URL } from './constants';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: EXCHANGE_NAME,
          type: 'topic',
        },
      ],
      uri: RABBITMQ_URL,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
