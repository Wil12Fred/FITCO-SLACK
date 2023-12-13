import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkspaceDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  accountId: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
