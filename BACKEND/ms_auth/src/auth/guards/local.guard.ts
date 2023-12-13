import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserLocalAuthGuardToken extends AuthGuard('user-local') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    console.log(request.body);
    request.body.username = 'admin2';
    await super.logIn(request);
    return activate;
  }
}
