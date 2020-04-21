import { Injectable } from '@nestjs/common';
import { InjectAmqpConnection } from 'nestjs-amqp';
import { RABBITMQ_QUEUE_NAME } from './constants';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { EventData } from './eventdata.interface';
import { json } from 'express';

@Injectable()
export class AppService {

  private count: number

  constructor(@InjectAmqpConnection('rabbitmq') private readonly rabbitConnection) {
    this.count = 0
  }

  async publish(message: EventData) {
    try {
      const channel = await this.rabbitConnection.createChannel();
      await channel.assertQueue(RABBITMQ_QUEUE_NAME);
      const jsonMessage = JSON.stringify(message)
      console.log(`sending message: ${jsonMessage}`)
      channel.sendToQueue(RABBITMQ_QUEUE_NAME, Buffer.from(jsonMessage, "utf8"));
    } catch (e) {
      console.log(`publish error: ${e}`)
    }
  }

  @Cron(CronExpression.EVERY_SECOND)
  async publishCron() {
    const message: EventData= {data: {counter: this.count++}}
    await this.publish(message)
  }

  @Timeout(10000)
  async consumeCron() {
    try {
      const channel = await this.rabbitConnection.createChannel();
      await channel.assertQueue(RABBITMQ_QUEUE_NAME);
      await channel.consume(RABBITMQ_QUEUE_NAME, (message ) => {
        console.log(`consuming data: ${message.content.toString("utf8")}`)
      })
    } catch (e) {
      console.log(`consume error: ${e}`)
    }
  }
}
