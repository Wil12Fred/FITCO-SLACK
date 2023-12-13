import {
  Controller,
  HttpStatus,
  HttpException,
  Post,
  Res,
  Body,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';
import { ChannelService } from './channel.service';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { ApiGuard } from 'src/utils/guards/api.guard';
import {
  UserAuthInterceptor,
  ChannelParamInterceptor,
} from 'src/common/interceptor/context.interceptor';
import { AuthUser } from 'src/utils/decorators/auth-user-decorators';
import { CreateChannelDTO } from './dto/createChannel.dto';
import { CreateChannelMessageDTO } from './dto/createChannelMessage.dto';

@ApiBearerAuth()
@ApiTags('channel')
@Controller('channel')
@UseGuards(ApiGuard)
@ApiBearerAuth('access-token')
@UseInterceptors(new ChannelParamInterceptor())
@UseInterceptors(new UserAuthInterceptor())
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Get(':channelId')
  @ApiOperation({ summary: 'Get channel' })
  @ApiCreatedResponse({ description: 'Channel got' })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  @HttpCode(200)
  async getById(
    @Param('channelId', ParseIntPipe) channelId: number,
    @AuthUser() user: any,
  ) {
    try {
      const channel = await this.channelService.filter(
        user.accountId,
        channelId,
        {
          userId: user.userId,
        },
      );
      if (channel) return channel;
      throw new Error('User Forbidden');
    } catch (error) {
      throw new HttpException(
        {
          status: 404,
          error: 'El espacio de trabajo es inválido' + error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Post(':channelId/message')
  @ApiOperation({ summary: 'Create message' })
  @ApiBody({ type: CreateChannelMessageDTO })
  @ApiCreatedResponse({ description: 'Message created' })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  async createMessage(
    @Res() res: Response,
    @Body() body: CreateChannelMessageDTO,
  ) {
    try {
      const messageCreated = await this.channelService.createMessage(body);
      return res.status(HttpStatus.OK).json({
        status: 201,
        message: 'Se creó correctamente el mensaje',
        messageCreated,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: 404,
          error: 'El mensaje es inválido' + error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Post()
  @ApiOperation({ summary: 'Create channel' })
  @ApiBody({ type: CreateChannelDTO })
  @ApiCreatedResponse({ description: 'Channel created' })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  async create(@Res() res: Response, @Body() body: CreateChannelDTO) {
    try {
      const channelCreated = await this.channelService.createOne(body);
      return res.status(HttpStatus.OK).json({
        status: 201,
        message: 'Se creó correctamente la cuenta',
        channelCreated,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: 404,
          error: 'El canal es inválido' + error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
