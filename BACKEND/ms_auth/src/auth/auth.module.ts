import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccountModule } from '../accounts/accounts.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserLocalStrategy } from './strategy/user.local.strategy';
import { HeaderMiddleware } from 'src/common/middleware/headerParams.middleware';

@Module({
  controllers: [AuthController],
  providers: [UserLocalStrategy, AuthService],
  imports: [
    UsersModule,
    AccountModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRATION_TIME,
        },
      }),
    }),
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HeaderMiddleware).forRoutes('/');
  }
}
