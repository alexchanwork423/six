import { Injectable } from "@nestjs/common";
import { CreateUserProps } from "src/domain/auth/dto/create-user";
import { User } from "src/domain/auth/user.entity";
import { UserRepository } from "src/domain/auth/user.repository";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.verified,
      user.provider,
      user.avatar ?? undefined,
    );
  }

  async create(data: CreateUserProps): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        provider: data.provider,
        avatar: data.avatar,
        verified: false, // DB concern
      },
    });

    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      user.verified,
      user.provider,
      user.avatar ?? undefined,
    );
  }

  async verifyEmail(email: string): Promise<void> {
    await this.prisma.user.update({
      where: { email },
      data: { verified: true },
    });
  }
}
