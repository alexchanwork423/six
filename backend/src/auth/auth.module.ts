import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailModule } from '../mail/mail.module';
@Module({
  imports: [MailModule], // ← Import MailModule here
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
