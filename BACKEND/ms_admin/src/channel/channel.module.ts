import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelController } from './channel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './models/channel.model';
import { AuthModule } from 'src/auth/auth.module';
import { HeaderMiddleware } from 'src/common/middleware/headerParams.middleware';
import { MessageModule } from 'src/message/message.module';
import { ChannelMessage } from './models/channelMessage.model';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([Channel, ChannelMessage]),
    AuthModule,
    MessageModule,
    BullModule.registerQueue({
      name: 'messages',
    }),
  ],
  providers: [ChannelService],
  controllers: [ChannelController],
  exports: [ChannelService],
})
export class ChannelModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HeaderMiddleware).forRoutes('/');
  }
}
