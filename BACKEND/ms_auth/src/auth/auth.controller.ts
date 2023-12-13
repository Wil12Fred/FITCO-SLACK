import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserLocalAuthGuardToken } from './guards/local.guard';
import { AccountHeader } from 'src/utils/headers-decorators';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
@AccountHeader()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(UserLocalAuthGuardToken)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
