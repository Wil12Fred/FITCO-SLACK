import { userStatus } from '../enums/user-status.enum';
import { IsString, IsInt, IsNotEmpty, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  AlreadyExistEmail,
  AlreadyExistUsername,
  NonExistAccount,
} from 'src/utils/custom-validations.service';

export class CreateUserDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @NonExistAccount()
  @IsDefined()
  accountId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'name',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'lastname',
  })
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'email',
  })
  @AlreadyExistEmail('accountId')
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'username',
  })
  @AlreadyExistUsername('accountId')
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'password',
  })
  password: string;

  @ApiProperty({
    description: 'userStatus',
  })
  status: userStatus;
}
