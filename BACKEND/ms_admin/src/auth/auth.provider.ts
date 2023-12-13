import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthProvider {
  private host = process.env.AUTH_HOST;

  constructor(private readonly httpService: HttpService) {}

  async validateToken(authorization: string): Promise<any> {
    return (
      await firstValueFrom(
        this.httpService.get<any>(`${this.host}/api/auth/login`, {
          headers: { Authorization: authorization },
        }),
      )
    ).data;
  }
}
