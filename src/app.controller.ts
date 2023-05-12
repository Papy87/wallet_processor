import { Controller, NotFoundException } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { TransactionsRequest } from './dto/transactions-request';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('add-transactions')
  async handleTransactionCreated(
    @Payload() data: TransactionsRequest,
    @Ctx() context: RmqContext,
  ) {
    try {
      await this.appService.handleTransaction(data);
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      channel.ack(originalMsg);
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
