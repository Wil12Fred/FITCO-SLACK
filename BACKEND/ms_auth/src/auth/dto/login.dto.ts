import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { NonExistAccount } from 'src/utils/custom-validations.service';

export class LoginDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @NonExistAccount()
  @IsDefined()
  accountId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'grant_type',
  })
  grant_type: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'username',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'password',
  })
  password: string;
}
