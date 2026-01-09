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
  Query,
  Delete,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {type  Response } from 'express';
import * as multer from 'multer';
import { WasabiService } from './images.service';
import { PrismaService } from '../prisma/prisma.service';
import { Readable } from 'stream';

@Controller('images')
export class ImagesController {
  private readonly logger = new Logger(ImagesController.name);

  constructor(
    private readonly wasabiService: WasabiService,
    private readonly prisma: PrismaService,
  ) {}

  // ===============================
  // GET IMAGES (PAGINATION)
  // ===============================
  @Get()
  async getImages(
    @Query('page') page = '1',
    @Query('limit') limit = '24',
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    const images = await this.prisma.image.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (pageNum - 1) * limitNum,
      take: limitNum,
    });

    return images.map((image) => ({
      id: image.id,
      title: image.title,
      description: image.description,
      tags: image.tags,
      url: this.wasabiService.getSignedUrl(image.path),
    }));
  }

  // ===============================
  // ✅ REAL FILE DOWNLOAD (NO CORS)
  // ===============================
   @Get(':id/download')
  async downloadImage(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const image = await this.prisma.image.findUnique({
      where: { id: +id },
    });

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    // Signed URL from Wasabi
    const signedUrl = this.wasabiService.getSignedUrl(image.path);

    // Node 18+ native fetch
    const response = await fetch(signedUrl);

    if (!response.ok || !response.body) {
      throw new NotFoundException('Failed to fetch image');
    }

    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${image.filename || 'image'}"`
    );
    res.setHeader(
      'Content-Type',
      response.headers.get('content-type') || 'application/octet-stream'
    );
  // ✅ Convert Web Stream → Node Stream
    const nodeStream = Readable.fromWeb(
      response.body as unknown as import('stream/web').ReadableStream
    );

    // ✅ Now pipe works
    nodeStream.pipe(res);
  }

  // ===============================
  // UPDATE IMAGE
  // ===============================
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

  // ===============================
  // DELETE IMAGE
  // ===============================
  @Delete(':id')
  async deleteImage(@Param('id') id: string) {
    const image = await this.prisma.image.findUnique({
      where: { id: +id },
    });

    if (!image) {
      throw new BadRequestException('Image not found');
    }

    await this.wasabiService.deleteFile(image.path);

    await this.prisma.image.delete({
      where: { id: +id },
    });

    return { success: true };
  }

  // ===============================
  // UPLOAD IMAGE
  // ===============================
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.memoryStorage(),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(
            new BadRequestException('Only image files allowed') as any,
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { title: string; description: string; tags: string },
  ) {
    if (!file) throw new BadRequestException('No file uploaded');
    if (!body.title || !body.description || !body.tags) {
      throw new BadRequestException('Missing title, description, or tags');
    }

    const fileUrl = await this.wasabiService.uploadFile(
      file,
      `${Date.now()}-${file.originalname}`,
    );

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

    return { url: fileUrl, id: image.id };
  }
}
