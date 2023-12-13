import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/config.validation';
import { WorkspaceModule } from './workspace/workspace.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(typeOrmConfig),
    DatabaseModule,
    WorkspaceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
