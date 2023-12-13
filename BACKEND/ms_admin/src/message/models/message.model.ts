import { ChannelMessage } from 'src/channel/models/channelMessage.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn({ type: 'int', name: 'messageId' })
  messageId: number;

  @Column()
  text: string;

  @Column()
  username: string;

  @Column('int', { name: 'userId', nullable: false })
  userId: number;

  @OneToMany(() => ChannelMessage, (channelMessage) => channelMessage.message)
  channelMessages: ChannelMessage[];
}
