import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Channel } from './channel.model';
import { Message } from 'src/message/models/message.model';

@Entity('channel_messages')
export class ChannelMessage {
  @PrimaryGeneratedColumn({ type: 'int', name: 'channelMessageId' })
  channelMessageId: number;

  @Column('int', { name: 'messageId', nullable: false })
  messageId: number;

  @ManyToOne(() => Message, (message) => message.channelMessages, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'messageId', referencedColumnName: 'messageId' }])
  message: Message;

  @Column('int', { name: 'channelId', nullable: false })
  channelId: number;

  @ManyToOne(() => Channel, (channel) => channel.channelMessages, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'channelId', referencedColumnName: 'channelId' }])
  channel: Channel;
}
