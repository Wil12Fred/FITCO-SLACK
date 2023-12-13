import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_workspaces')
export class UserWorkspace {
  @PrimaryGeneratedColumn({ type: 'int', name: 'userWorkspaceId' })
  userWorkspaceId: number;

  @Column('int', { name: 'userId', nullable: false })
  userId: number;

  @Column('int', { name: 'workspaceId', nullable: false })
  workspaceId: number;
}
