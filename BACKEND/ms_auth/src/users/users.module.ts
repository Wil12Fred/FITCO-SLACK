import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './models/users.model';
import { UserByAccount } from './models/userByAccount.model';
import { HeaderMiddleware } from 'src/common/middleware/headerParams.middleware';

@Module({
  imports: [SequelizeModule.forFeature([Users, UserByAccount])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HeaderMiddleware).forRoutes('/');
  }
}
