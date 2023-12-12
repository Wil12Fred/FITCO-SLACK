import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsDefined,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  NonExistAccount,
  NonExistUser,
} from 'src/utils/custom-validations.service';

export class UpdateUserDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @NonExistUser('accountId')
  @IsDefined()
  userId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @NonExistAccount()
  @IsDefined()
  accountId: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'name',
  })
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'lastname',
  })
  lastname: string;
}
