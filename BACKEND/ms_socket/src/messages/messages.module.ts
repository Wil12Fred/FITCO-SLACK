import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MessageProcessor } from './messages.processor';
import { EventsGateway } from 'src/events/events.gateway';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'messages',
    }),
  ],
  providers: [MessageProcessor, EventsGateway],
  exports: [BullModule],
})
export class MessagesModule {}
