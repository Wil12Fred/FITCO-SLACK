import {
  ParseIntPipe,
  Controller,
  HttpStatus,
  HttpException,
  Post,
  Res,
  Body,
  Put,
  Delete,
  Get,
  Param,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDTO } from './dto/createUsers.dto';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/updateUsers.dto';
import { AccountHeader } from 'src/utils/headers-decorators';
import { UserParamInterceptor } from 'src/common/interceptor/context.interceptor';
import { JwtAuthGuardLogin } from 'src/auth/guards/jwt-auth.guard';
import { AuthUser } from 'src/utils/auth-user-decorators';
import { IJwtPayloadLogin } from 'src/auth/interfaces/jwt-payload-login.interface';

@ApiBearerAuth('access-token')
@ApiTags('users')
@Controller('users')
@AccountHeader()
@UseInterceptors(new UserParamInterceptor())
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDTO })
  @ApiCreatedResponse({ description: 'User created' })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  async createUser(
    @Res() res: Response,
    @Body() createUsersDTO: CreateUserDTO,
  ) {
    const userCreated = await this.userService.createUser(
      createUsersDTO.accountId,
      createUsersDTO,
    );
    return res.status(HttpStatus.OK).json({
      status: 201,
      message: 'Se creó correctamente el usuario',
      userCreated,
    });
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Update user' })
  @ApiBody({ type: UpdateUserDto })
  @ApiCreatedResponse({ description: 'User updated' })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuardLogin)
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Res() res: Response,
    @Body() updateUserDTO: UpdateUserDto,
  ) {
    try {
      const userUpdated = await this.userService.updateUser(
        userId,
        updateUserDTO,
      );
      return res.status(HttpStatus.OK).json({
        status: 201,
        message: 'Se actualizó correctamente el usuario',
        userUpdated,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: 404,
          error:
            'Un error ocurrió cuando se actualizaba el usuario ' +
            error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @ApiOperation({ summary: 'Get users' })
  @ApiCreatedResponse({ description: 'Users got' })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuardLogin)
  @Get('')
  async getUsers(
    @Query('username') username: string,
    @AuthUser() user: IJwtPayloadLogin,
  ) {
    try {
      const users = await this.userService.getAll(user.accountId, {
        username,
      });
      return users;
    } catch (error) {
      throw new HttpException(
        {
          status: 404,
          error: 'Un error ocurrió obteniendo el usuario ' + error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user' })
  @ApiCreatedResponse({ description: 'User got' })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuardLogin)
  async getUserById(@Param('userId', ParseIntPipe) userId: number) {
    try {
      const user = await this.userService.findbyId(userId);
      if (userId) {
        return user;
      }
      throw new Error('User Forbidden');
    } catch (error) {
      throw new HttpException(
        {
          status: 404,
          error: 'Un error ocurrió obteniendo el usuario ' + error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user' })
  @ApiCreatedResponse({ description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuardLogin)
  async deleteUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Res() res: Response,
  ) {
    try {
      const deleteUser = await this.userService.deleteUserById(userId);
      return res.status(HttpStatus.OK).json({
        status: 201,
        message: 'Se elimino correctamente el usuario',
        deleteUser,
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error:
            'Un error ocurrio mientras se eliminaba el usuario ' +
            error.message,
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
