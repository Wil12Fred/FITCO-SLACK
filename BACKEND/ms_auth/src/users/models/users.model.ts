import {
  Column,
  Model,
  PrimaryKey,
  Table,
  AutoIncrement,
  Unique,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';

import { userStatus } from '../enums/user-status.enum';
import { UserByAccount } from './userByAccount.model';
import { Accounts } from 'src/accounts/models/accounts.model';

@Table({
  timestamps: true,
  tableName: 'users',
  paranoid: true,
})
export class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  userId: number;

  @Column
  name: string;

  @Column
  lastname: string;

  @Column
  email: string;

  @Column
  username: string;

  @Column
  password: string;

  @Column
  status: userStatus;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @DeletedAt
  @Column
  deleteAt: Date;

  @HasMany(() => UserByAccount)
  userAccounts: UserByAccount[];

  @BelongsToMany(() => Accounts, () => UserByAccount, 'userId')
  account: Accounts[];
}
