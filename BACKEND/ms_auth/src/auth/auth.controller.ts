import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserLocalAuthGuardToken } from './guards/local.guard';
import { AccountHeader } from 'src/utils/headers-decorators';
import { JwtAuthGuardLogin } from './guards/jwt-auth.guard';
import { AuthUser } from 'src/utils/auth-user-decorators';
import { IJwtPayloadLogin } from './interfaces/jwt-payload-login.interface';

@ApiTags('auth')
@Controller('auth')
@AccountHeader()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuardLogin)
  @ApiBearerAuth('access-token')
  @Get('login')
  validateLoginToken(@AuthUser() user: IJwtPayloadLogin) {
    return user;
  }

  @UseGuards(UserLocalAuthGuardToken)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
