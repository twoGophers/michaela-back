// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity'; // Модель пользователя
import { CreateUserDto } from './dto/create-user.dto'; // Импортируем DTO

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, name } = createUserDto;

    // Присваиваем роль по умолчанию "user"
    const role = "user";  // Это можно изменить на любую логику, например, "admin" или "manager"

    const user = this.usersRepository.create({ email, password, name, role });
    return this.usersRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
