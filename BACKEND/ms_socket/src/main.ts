import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { AllConfigType } from './config/config.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get<ConfigService<AllConfigType>>(ConfigService);

  app.enableShutdownHooks();

  await app.listen(configService.getOrThrow('app.port', { infer: true }));
}
bootstrap();
