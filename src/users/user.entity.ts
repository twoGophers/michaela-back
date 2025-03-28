import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()  // Убедитесь, что сущность помечена этим декоратором
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  role: string;  // Поле для роли
}
