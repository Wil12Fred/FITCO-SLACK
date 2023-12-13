import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/config.validation';
import { WorkspaceModule } from './workspace/workspace.module';
import { BullModule } from '@nestjs/bull';
import { DatabaseModule } from './config/database/database.module';
import { ChannelModule } from './channel/channel.module';

@Module({
  imports: [
    ConfigModule.forRoot(typeOrmConfig),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    DatabaseModule,
    WorkspaceModule,
    ChannelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
