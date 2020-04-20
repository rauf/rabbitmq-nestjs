import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EventData } from './EventData.interface';
import { RABBIT_TEST_PATTERN } from './constants';

@Controller('/send')
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'hello'
  }

  @EventPattern(RABBIT_TEST_PATTERN)
  consume(@Payload() { data }: EventData, @Ctx() context: RmqContext) {
    console.log(`consuming data: ${data.counter}`);
  }
}
