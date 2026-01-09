import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { generateVerificationToken, verifyToken } from './jwt-utils';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}
createToken(user) {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,})}
  // Signup
  async signup(name: string, email: string, password: string) {
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = generateVerificationToken(email);
    const expiration = new Date(Date.now() + 1 * 60 * 1000);
    console.log(token)
    await this.mailService.sendVerificationEmail(email, token);

    return { success: true, message: 'User created. Check your email to verify.' };
  }

  // Verify Email
  async verifyEmail(token: string) {
    try {
      const payload: any = verifyToken(token);
      const email = payload.email;

      const user = await this.prisma.user.findUnique({ where: { email } ,
      });
      if (!user) throw new BadRequestException('User not found');

      if (user.verified) return { success: true, message: 'Email already verified' };

      await this.prisma.user.update({
        where: { email },
        data: { verified: true },
      });

      return { success: true, message: 'Email verified successfully' };
    } catch (err) {
      throw new BadRequestException('Invalid or expired token');
    }
  }

  // Login
  async login(email: string, password: string) {
  const user = await this.prisma.user.findUnique({ where: { email } });
  if (!user) return { success: false, message: 'Invalid email or password' };
  if (!user.verified) return { success: false, message: 'Email not verified' };

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return { success: false, message: 'Invalid email or password' };

  // Generate JWT
 const secret = process.env.JWT_SECRET;
if (!secret) throw new Error('JWT_SECRET is not defined');

const token = jwt.sign({ id: user.id, email: user.email }, secret, {
  expiresIn: '1h',
});

  return { success: true, message: 'Login successful', token, user: { id: user.id, name: user.name, email: user.email } };
}
  async googleLogin(googleUser) {
    if (!googleUser) {
      throw new Error('No user from Google');
    }

    let user = await this.prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: googleUser.email,
          name: googleUser.name,
          avatar: googleUser.avatar,
          provider: 'google',
          verified: true,
          password: 'GOOGLE_AUTH',
        },
      });
    }

    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
        email: user.email,
      }),
    };
  }


}
