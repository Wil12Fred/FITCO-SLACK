import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Workspace } from './workspace.model';

@Entity('user_workspaces')
export class UserWorkspace {
  @PrimaryGeneratedColumn({ type: 'int', name: 'userWorkspaceId' })
  userWorkspaceId: number;

  @Column('int', { name: 'userId', nullable: false })
  userId: number;

  @Column('int', { name: 'workspaceId', nullable: false })
  workspaceId: number;

  @ManyToOne(() => Workspace, (workspace) => workspace.userWorkspaces, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'workspaceId', referencedColumnName: 'workspaceId' }])
  workspace: Workspace;
}
