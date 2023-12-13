import { Injectable } from '@nestjs/common';
import { Channel } from './models/channel.model';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMessage } from './models/channelMessage.model';
import { CreateChannelMessageDTO } from './dto/createChannelMessage.dto';
import { Message } from 'src/message/models/message.model';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private repository: Repository<Channel>,
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(ChannelMessage)
    private channelMessageRepository: Repository<ChannelMessage>,
  ) {}

  async createOne(channel: any): Promise<Channel> {
    try {
      return await this.repository.save(channel);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getOne(channelId: number) {
    return await this.repository.findOne({ where: { channelId } });
  }

  async createMessage(message: CreateChannelMessageDTO): Promise<Message> {
    try {
      const newMessage = await this.messageRepository.save({
        userId: message.userId,
        text: message.text,
        username: message.username,
      });
      await this.channelMessageRepository.save({
        messageId: newMessage.messageId,
        channelId: message.channelId,
      });
      console.log(newMessage);
      message.messageId = newMessage.messageId;
      return newMessage;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async filter(_accountId: number, channelId: number, params: any) {
    const whereOptions: FindOptionsWhere<Channel> = {
      channelId,
    };
    if (params) {
      console.log(params);
    }
    return await this.repository.findOne({
      where: whereOptions,
      relations: ['channelMessages', 'channelMessages.message'],
    });
  }
}
