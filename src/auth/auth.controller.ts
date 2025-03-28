// src/auth/auth.controller.ts
import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Регистрация пользователя
  @Post('register')
  async register(
    @Body() body: { email: string; password: string; name: string }
  ) {
    
    return this.authService.register(body);
  }

  // Авторизация пользователя
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
