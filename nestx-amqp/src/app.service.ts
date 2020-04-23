import { Injectable } from '@nestjs/common';
import { PublishQueue, SubscribeQueue } from 'nestx-amqp';
import { QUEUE_NAME } from './constants';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventData } from './eventdata.interface';

@Injectable()
export class AppService {

  private count: number

  constructor() {
    this.count = 0;
  }

  @PublishQueue(QUEUE_NAME)
  async testPublishQueue(content: EventData) {
    console.log(`publishing message ${JSON.stringify(content)}`)
  }

  @Cron(CronExpression.EVERY_SECOND)
  async cron() {
    const data: EventData = {data: {counter: this.count++}}
    await this.testPublishQueue(data)
  }

  @SubscribeQueue(QUEUE_NAME)
  yourSubscribeQueueMethod(content: EventData){
    console.log(`consuming message: ${JSON.stringify(content)}`)
  }

}
