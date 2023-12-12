import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserLocalAuthGuardToken extends AuthGuard('user-local') {}
