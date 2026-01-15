import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';

import { UserPrismaRepository } from '../../infrastructure/auth/user.prisma.repository';

import { PasswordService } from '../../infrastructure/auth/password.service';
import { JwtTokenService } from '../../infrastructure/auth/jwt-token.service';

import { SignupUseCase } from '../../application/auth/use-cases/signup.usecase';
import { LoginUseCase } from '../../application/auth/use-cases/login.usecase';
import { MailModule } from 'src/mail/mail.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleStrategy } from 'src/auth/google.strategy';
import { JwtStrategy } from 'src/auth/jwt.strategy';


@Module({
  imports: [
    MailModule,

    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],

  controllers: [AuthController],

  providers: [
    PrismaService,

    // 🔹 Repository binding (Domain → Infrastructure)
    {
      provide: 'UserRepository',
      useClass: UserPrismaRepository,
    },

    // 🔹 Infrastructure services
    PasswordService,
    JwtTokenService,

    // 🔹 Use cases (Application layer)
    {
      provide: SignupUseCase,
      useFactory: (repo, password, mail) =>
        new SignupUseCase(repo, password, mail),
      inject: ['UserRepository', PasswordService, 'MailService'],
    },

    {
      provide: LoginUseCase,
      useFactory: (repo, password, jwt) =>
        new LoginUseCase(repo, password, jwt),
      inject: ['UserRepository', PasswordService, JwtTokenService],
    },

    // 🔹 Strategies (Infrastructure)
    GoogleStrategy,
    JwtStrategy,
  ],

  exports: [
    PassportModule,
    JwtModule,
  ],
})
export class AuthModule {}
