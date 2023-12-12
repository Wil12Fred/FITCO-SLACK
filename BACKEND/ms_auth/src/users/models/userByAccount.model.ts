import {
  Column,
  Model,
  ForeignKey,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { Users } from './users.model';
import { Accounts } from '../../accounts/models/accounts.model';

@Table({
  timestamps: false,
  tableName: 'userByAccount',
})
export class UserByAccount extends Model {
  @BelongsTo(() => Users)
  user: Users;

  @ForeignKey(() => Users)
  @Column
  userId: number;

  @ForeignKey(() => Accounts)
  @Column
  accountId: number;

  @BelongsTo(() => Accounts, { hooks: true })
  accounts: Accounts;
}
