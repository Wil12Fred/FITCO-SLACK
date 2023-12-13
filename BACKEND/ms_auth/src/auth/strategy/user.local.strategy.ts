import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class UserLocalStrategy extends PassportStrategy(
  Strategy,
  'user-local',
) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'username', passReqToCallback: true });
  }

  async validate(
    req: Request,
    username: string,
    password: string,
  ): Promise<any> {
    const user = await this.authService.validateUser(
      Number(req.body.accountId),
      username,
      password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
