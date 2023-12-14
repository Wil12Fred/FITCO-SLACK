import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserWorkspaceDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  accountId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  workspaceId: number;

  @IsInt()
  invitedUserId: number;
}
