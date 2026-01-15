import { BadRequestException } from '@nestjs/common';
import { UserRepository } from '../../../domain/auth/user.repository';
import { PasswordService } from '../../../infrastructure/auth/password.service';
import { generateVerificationToken } from '../../../auth/jwt-utils';
import { MailService } from 'src/mail/mail.service';

export class SignupUseCase {
  constructor(
    private userRepo: UserRepository,
    private passwordService: PasswordService,
    private mailService: MailService,
  ) {}

  async execute(name: string, email: string, password: string) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new BadRequestException('Email already exists');

    const hashed = await this.passwordService.hash(password);

    await this.userRepo.create({
      name,
      email,
      password: hashed,
      verified: false,
    });

    const token = generateVerificationToken(email);
    await this.mailService.sendVerificationEmail(email, token);

    return { success: true, message: 'Check your email to verify' };
  }
}
