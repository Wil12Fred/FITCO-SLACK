import { Injectable } from '@nestjs/common';
import { Accounts } from './models/accounts.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Accounts)
    private accounts: typeof Accounts,
  ) {}

  async createOneAccount(
    name: string,
    description: string,
    type: string,
    status: string,
  ): Promise<Accounts> {
    try {
      const accountNew = await this.accounts.create({
        name,
        description,
        type,
        status,
      });
      return accountNew;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
