import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AMQPModule } from 'nestx-amqp';
import { ScheduleModule } from '@nestjs/schedule';
import { RABBITMQ_URL } from './constants';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AMQPModule.forRootAsync({
      useFactory: () => ({
        urls: [RABBITMQ_URL],
      }),
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
