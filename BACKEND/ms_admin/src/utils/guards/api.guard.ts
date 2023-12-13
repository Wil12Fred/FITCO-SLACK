import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthProvider } from 'src/auth/auth.provider';

@Injectable()
export class ApiGuard implements CanActivate {
  constructor(private authProvider: AuthProvider) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      if (!request.headers.authorization) {
        return false;
      }
      const validateToken = await this.authProvider.validateToken(
        request.headers.authorization,
      );
      if (validateToken) {
        request.user = validateToken;
      }
      return validateToken;
    } catch (e) {
      return false;
    }
  }
}
