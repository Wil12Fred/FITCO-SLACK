import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Accounts } from './accounts/models/accounts.model';
import { AccountModule } from './accounts/accounts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import {
  AlreadyExistEmailConstraint,
  AlreadyExistUsernameConstraint,
  NonExistAccountConstraint,
  NonExistUserConstraint,
} from './utils/custom-validations.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQ_DB_HOST,
      port: Number.parseInt(process.env.MYSQ_DB_PORT),
      username: process.env.MYSQ_DB_USERNAME,
      password: process.env.MYSQ_DB_PASSWORD,
      database: process.env.MYSQ_DB_DATABASE,
      models: [Accounts],
      autoLoadModels: true,
      synchronize: true,
    }),
    AccountModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    NonExistUserConstraint,
    NonExistAccountConstraint,
    AlreadyExistEmailConstraint,
    AlreadyExistUsernameConstraint,
  ],
})
export class AppModule {}
