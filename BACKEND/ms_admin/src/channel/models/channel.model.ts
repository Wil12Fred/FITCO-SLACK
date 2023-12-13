import { Workspace } from 'src/workspace/models/workspace.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChannelMessage } from './channelMessage.model';

@Entity('channels')
export class Channel {
  @PrimaryGeneratedColumn({ type: 'int', name: 'channelId' })
  channelId: number;

  @Column('int', { name: 'workspaceId', nullable: false })
  workspaceId: number;

  @Column()
  name: string;

  @ManyToOne(() => Workspace, (workspace) => workspace.channels, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'workspaceId', referencedColumnName: 'workspaceId' }])
  workspace: Workspace;

  @OneToMany(() => ChannelMessage, (channelMessage) => channelMessage.channel)
  channelMessages: ChannelMessage[];
}
