import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventData } from './EventData.interface';
import { RABBIT_TEST_PATTERN } from './constants';

@Injectable()
export class TaskService {

  private count: number;

  constructor(@Inject("RabbitClient") private rabbitClient: ClientProxy) {
    this.count = 0;
  }

  @Cron(CronExpression.EVERY_SECOND)
  cron() {
    const data: EventData = {data: {counter: this.count++}};
    console.log(`sending count: ${data.data.counter}`)
    return this.rabbitClient.emit<any, EventData>(RABBIT_TEST_PATTERN, data);
  }

}
