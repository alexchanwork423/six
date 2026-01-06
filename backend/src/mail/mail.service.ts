import { Injectable } from '@nestjs/common';
import { log } from 'console';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL, // your gmail
      pass: process.env.GMAIL_PASSWORD, // app password
    },
});
  }

  async sendVerificationEmail(to: string, token: string) {
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    await this.transporter.sendMail({
      from: `"My NestJS App" <${process.env.GMAIL_EMAIL}>`,
      to,
      subject: 'Verify your email',
      html: `<p>Click this link to verify your email: <a href="${verificationLink}">Verify Email</a></p>`,
    });
  }
}
