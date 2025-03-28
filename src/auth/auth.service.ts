// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';  // Путь к CreateUserDto

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Регистрация пользователя
  async register(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Присваиваем роль по умолчанию "user"
    const role = "user";  // Можем задать роль в зависимости от логики или прав администратора
    const user = await this.usersService.createUser({ email, password: hashedPassword, name });
    return {
      message: 'Пользователь зарегистрирован',
      user,
    };
  }

  // Авторизация пользователя
  async login(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Неверные учетные данные');
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,  // Роль возвращаем в ответе
    };
  }
}
