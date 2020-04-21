import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AmqpModule } from 'nestjs-amqp';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AmqpModule.forRoot({
    name: 'rabbitmq',
    hostname: 'localhost',
    port: 5672,
    username: 'guest',
    password: 'guest',
  })],
  providers: [AppService],
})
export class AppModule {}
