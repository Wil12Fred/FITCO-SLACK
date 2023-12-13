import { Injectable } from '@nestjs/common';
import { Channel } from './models/channel.model';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private repository: Repository<Channel>,
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

  async filter(accountId: number, channelId: number, params: any) {
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
