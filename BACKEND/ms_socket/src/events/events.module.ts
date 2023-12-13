import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { RedisModule } from 'src/redis/redis.module';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [RedisModule, MessagesModule],
  providers: [EventsGateway],
})
export class EventsModule {}
