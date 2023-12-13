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
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDTO } from './dto/createWorkspace.dto';
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
import { UserAuthInterceptor } from 'src/common/interceptor/context.interceptor';
import { AuthUser } from 'src/utils/decorators/auth-user-decorators';

@ApiBearerAuth()
@ApiTags('workspace')
@Controller('workspace')
@UseGuards(ApiGuard)
@ApiBearerAuth('access-token')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @Get('')
  @ApiOperation({ summary: 'Get workspaces' })
  @ApiCreatedResponse({ description: 'Workspaces got' })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  @HttpCode(200)
  @UseInterceptors(new UserAuthInterceptor())
  async getAll(@AuthUser() user: any) {
    try {
      return await this.workspaceService.getAll(user.userId);
    } catch (error) {
      throw new HttpException(
        {
          status: 404,
          error: 'La espacio de trabajo es inválido' + error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get(':workspaceId')
  @ApiOperation({ summary: 'Get workspace' })
  @ApiCreatedResponse({ description: 'Workspace got' })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  @HttpCode(200)
  @UseInterceptors(new UserAuthInterceptor())
  async getById(
    @Param('workspaceId', ParseIntPipe) workspaceId: number,
    @AuthUser() user: any,
  ) {
    try {
      const workspace = await this.workspaceService.filter(
        user.accountId,
        workspaceId,
        {
          userId: user.userId,
        },
      );
      if (workspace) return workspace;
      throw new Error('Workspace Forbidden');
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

  @Post()
  @ApiOperation({ summary: 'Create workspace' })
  @ApiBody({ type: CreateWorkspaceDTO })
  @ApiCreatedResponse({ description: 'Workspace created' })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  @UseInterceptors(new UserAuthInterceptor())
  async create(
    @Res() res: Response,
    @Body() body: CreateWorkspaceDTO,
    @AuthUser() user: any,
  ) {
    try {
      const accountCreated = await this.workspaceService.createOne(body, user);
      return res.status(HttpStatus.OK).json({
        status: 201,
        message: 'Se creó correctamente el espacio de trabajo',
        accountCreated,
      });
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
}
