import { IsInt, IsString } from 'class-validator';

export class CreateChannelDTO {
  @IsInt()
  workspaceId: number;

  @IsString()
  name: string;
}
