import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],  // Register MailService as a provider
  exports: [MailService],    // Export it so other modules can use it
})
export class MailModule {}
