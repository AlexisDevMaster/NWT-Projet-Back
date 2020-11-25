import { Controller, Get,  Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Request() request) {
    return await this.authService.validateUserByPassword(request);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
