import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateChannelMessageDTO {
  messageId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  channelId: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  text: string;
}
