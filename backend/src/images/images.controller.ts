// src/images/images.controller.ts
import {
  Put,
  Get,
  Param,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
  Logger,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { WasabiService } from './images.service';
import { PrismaService } from '../prisma/prisma.service';
@Controller('images')
export class ImagesController {
  private readonly logger = new Logger(ImagesController.name);

  constructor(
    private readonly wasabiService: WasabiService,
    private readonly prisma: PrismaService,
  ) {}
@Get()
async getAllImages() {
  const images = await this.prisma.image.findMany({
    orderBy: { createdAt: 'desc' }, // optional
  });

  return images.map((image) => ({
    id: image.id,
    title: image.title,
    description: image.description,
    tags: image.tags,
    url: this.wasabiService.getSignedUrl(image.path),
  }));
}
 @Put(':id')
  async updateImage(
    @Param('id') id: string,
    @Body() body: { title?: string; description?: string; tags?: string },
  ) {
    return this.prisma.image.update({
      where: { id: +id },
      data: body,
    });
  }
  
  // ✅ DELETE IMAGE
  @Delete(':id')
  async deleteImage(@Param('id') id: string) {
    const image = await this.prisma.image.findUnique({
      where: { id: +id },
    });

    if (!image) {
      throw new BadRequestException('Image not found');
    }

    // delete from Wasabi
    await this.wasabiService.deleteFile(image.path);

    // delete from DB
    await this.prisma.image.delete({
      where: { id: +id },
    });

    return { success: true };
  }
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.memoryStorage(),
      fileFilter: (req, file, cb) => {
        // Debugging file received
        console.log('--- fileFilter called ---');
        console.log('FIle', file);
        console.log('Field name:', file.fieldname);
        console.log('Original name:', file.originalname);
        console.log('Mimetype:', file.mimetype);

        // NestJS Logger (optional)
        Logger.log(`fileFilter called: ${file.originalname}`, 'ImagesController');

        if (!file.mimetype.startsWith('image/')) {
          return cb(new BadRequestException('Only image files allowed') as any, false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { title: string; description: string; tags: string },
  ) {
    console.log('--- uploadImage body & file ---');
    console.log('Body:', body);
    console.log('File:', file);

    if (!file) throw new BadRequestException('No file uploaded');
    if (!body.title || !body.description || !body.tags) {
      throw new BadRequestException('Missing title, description, or tags');
    }

    // Upload to Wasabi
    const fileUrl = await this.wasabiService.uploadFile(
      file,
      `${Date.now()}-${file.originalname}`,
    );

    // Save to database
    const image = await this.prisma.image.create({
      data: {
        title: body.title,
        description: body.description,
        tags: body.tags,
        path: fileUrl,
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      },
    });

    this.logger.log(`Uploaded file: ${file.originalname}, URL: ${fileUrl}`);
    console.log('Upload successful:', fileUrl);

    return { url: fileUrl, id: image.id };
  }
}
