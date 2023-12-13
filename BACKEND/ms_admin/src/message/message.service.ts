import { Injectable } from '@nestjs/common';
import { Message } from './models/message.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private repository: Repository<Message>,
  ) {}

  async createOne(message: any): Promise<Message> {
    try {
      await this.repository.save(message);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
