import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { WasabiService } from './images.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ImagesController],
  providers: [WasabiService, PrismaService],
})
export class ImagesModule {}
