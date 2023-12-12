import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { Accounts } from './models/accounts.model';

@Module({
  imports: [SequelizeModule.forFeature([Accounts])],
  providers: [AccountsService],
  controllers: [AccountsController],
  exports: [AccountsService],
})
export class AccountModule {}
