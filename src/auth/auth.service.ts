import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersPassService } from '../users-pass/users-pass.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usersPassService: UsersPassService,
    private readonly _jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this._usersPassService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this._jwtService.sign(payload),
    };
  }
}
