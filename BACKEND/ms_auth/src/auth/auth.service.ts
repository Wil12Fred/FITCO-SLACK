import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { IJwtPayloadLogin } from './interfaces/jwt-payload-login.interface';
import { Users } from 'src/users/models/users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    console.log('user del login');
    console.log(loginDto);
    const { username } = loginDto;
    const user = await this.userService.findbyUsernameOrEmail(username);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const payload: IJwtPayloadLogin = {
      userId: user.userId,
      username: user.username,
      email: user.email,
    };
    const token = this._createToken(payload);
    delete user.password;
    return { user, token };
  }

  private _createToken(userPayload: any): any {
    const expiresIn = process.env.JWT_EXPIRATION_TIME;
    const token_type = 'Bearer';
    const scope = '';
    const accessToken = this.jwtService.sign(userPayload);

    return {
      expiresIn,
      token_type,
      accessToken,
      scope,
    };
  }

  async validateUser(
    usernameOrEmail: string,
    password: string,
  ): Promise<Users> {
    const user = await this.userService.findbyUsernameOrEmail(usernameOrEmail);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    const secretEncrypt = await this.userService.encyptPassword(
      user.userId,
      password,
    );

    if (!(user && (await bcrypt.compare(password, secretEncrypt)))) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
