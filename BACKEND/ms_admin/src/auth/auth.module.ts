import { Module } from '@nestjs/common';
import { AuthProvider } from './auth.provider';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AuthProvider],
  exports: [AuthProvider],
})
export class AuthModule {}
