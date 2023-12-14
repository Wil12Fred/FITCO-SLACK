import { Channel } from 'src/channel/models/channel.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserWorkspace } from './userWorkspace.model';

@Entity('workspaces')
export class Workspace {
  @PrimaryGeneratedColumn({ type: 'int', name: 'workspaceId' })
  workspaceId: number;

  @Column('int', { name: 'accountId', nullable: false })
  accountId: number;

  @Column()
  name: string;

  @OneToMany(() => Channel, (channel) => channel.workspace)
  channels: Channel[];

  @OneToMany(() => UserWorkspace, (userWorkspace) => userWorkspace.workspace)
  userWorkspaces: UserWorkspace[];
}
