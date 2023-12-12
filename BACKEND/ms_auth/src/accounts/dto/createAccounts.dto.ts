import { accountStatus } from '../enums/account-status.enum';
import { accountType } from '../enums/account-type.enum';
import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountsDTO {
  @IsInt()
  accountId: number;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'name',
  })
  name: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'description',
  })
  description: string;

  @ApiProperty({
    description: 'type',
  })
  type: accountType;

  @ApiProperty({
    description: 'status',
  })
  status: accountStatus;
}
