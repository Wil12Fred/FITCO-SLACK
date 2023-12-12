import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { AccountsService } from 'src/accounts/accounts.service';
import { UsersService } from 'src/users/users.service';

export const NonExistAccount = (validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [null],
      validator: NonExistAccountConstraint,
    });
  };
};

export const NonExistUser = (
  account: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [account, null],
      validator: NonExistUserConstraint,
    });
  };
};

export const AlreadyExistEmail = (
  account: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [account, null],
      validator: AlreadyExistEmailConstraint,
    });
  };
};

export const AlreadyExistUsername = (
  account: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [account, null],
      validator: AlreadyExistUsernameConstraint,
    });
  };
};

@ValidatorConstraint({ name: 'NonExistAccount' })
export class NonExistAccountConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly accountService: AccountsService) {}

  async validate(value: any) {
    return (await this.accountService.getById(value)) ? true : false;
  }

  defaultMessage() {
    return "The account doesn't exist in the database";
  }
}

@ValidatorConstraint({ name: 'AlreadyExistEmail' })
export class AlreadyExistEmailConstraint
  implements ValidatorConstraintInterface
{
  constructor(protected readonly userService: UsersService) {}

  async validate(value: any, args: ValidationArguments) {
    const accountId: number = (args.object as any)[args.constraints[0]];
    const filterUser = await this.userService.filter(accountId, {
      email: value,
    });
    return filterUser ? false : true;
  }

  defaultMessage() {
    return 'The email already exist in the database';
  }
}

@ValidatorConstraint({ name: 'AlreadyExistUsername' })
export class AlreadyExistUsernameConstraint
  implements ValidatorConstraintInterface
{
  constructor(protected readonly userService: UsersService) {}

  async validate(value: any, args: ValidationArguments) {
    const accountId: number = (args.object as any)[args.constraints[0]];
    if (!accountId) {
      throw new Error('Non account');
    }
    const filterUser = await this.userService.filter(accountId, {
      username: value,
    });
    return filterUser ? false : true;
  }

  defaultMessage() {
    return 'The username already exist in the database';
  }
}

@ValidatorConstraint({ name: 'NonExistUser' })
export class NonExistUserConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly userService: UsersService) {}

  async validate(value: any, args: ValidationArguments) {
    const accountId: number = (args.object as any)[args.constraints[0]];
    const filterUser = await this.userService.filter(accountId, {
      userId: value,
    });
    return filterUser ? true : false;
  }

  defaultMessage() {
    return "User doesn't Exist.";
  }
}
