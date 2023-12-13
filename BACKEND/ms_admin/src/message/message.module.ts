import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './models/message.model';
import { AuthModule } from 'src/auth/auth.module';
import { MessageService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), AuthModule],
  providers: [MessageService],
  exports: [MessageService, TypeOrmModule],
})
export class MessageModule {}
