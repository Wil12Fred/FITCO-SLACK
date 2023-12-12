import { IsEnum } from 'class-validator';
import {
  AutoIncrement,
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { accountStatus } from '../enums/account-status.enum';
import { accountType } from '../enums/account-type.enum';

@Table({
  timestamps: false,
  tableName: 'accounts',
})
export class Accounts extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  accountId: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  @IsEnum(accountType)
  type: accountType;

  @Column
  @IsEnum(accountStatus)
  status: accountStatus;

  @CreatedAt
  @Column
  createdAt: Date;

  @UpdatedAt
  @Column
  updatedAt: Date;

  @DeletedAt
  @Column
  deletedAt: Date;
}
