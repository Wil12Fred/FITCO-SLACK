import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('workspaces')
export class Workspace {
  @PrimaryGeneratedColumn({ type: 'int', name: 'workspaceId' })
  workspaceId: number;

  @Column('int', { name: 'accountId', nullable: false })
  accountId: number;

  @Column()
  name: string;
}
