import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserWorkspaceDTO {
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  accountId: number;

  @IsInt()
  workspaceId: number;

  @IsInt()
  invitedUserId: number;
}
