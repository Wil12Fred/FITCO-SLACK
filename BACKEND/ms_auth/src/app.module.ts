import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Accounts } from './accounts/models/accounts.model';
import { AccountModule } from './accounts/accounts.module';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
