import { Injectable } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EXCHANGE_NAME, QUEUE_NAME, ROUTING_KEY } from './constants';
import { EventData } from './eventdata.interface';

@Injectable()
export class AppService {

  private count: number

  constructor(private readonly amqpConnection: AmqpConnection) {
    this.count = 0
  }

  @RabbitSubscribe({
    exchange: EXCHANGE_NAME,
    routingKey: ROUTING_KEY,
    queue: QUEUE_NAME,
  })
  public async pubSubHandler(msg: EventData) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
  }

  @Cron(CronExpression.EVERY_SECOND)
  async cron() {
    const message: EventData = {data: {counter: this.count++}}
    console.log(`sending message: ${JSON.stringify(message)}`)
    await this.amqpConnection.publish(EXCHANGE_NAME, ROUTING_KEY, message)
  }

}
