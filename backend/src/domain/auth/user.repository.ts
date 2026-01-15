// domain/auth/user.repository.ts
import { CreateUserProps } from './dto/create-user';
import { User } from './user.entity';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserProps): Promise<User>;
  verifyEmail(email: string): Promise<void>;
}
