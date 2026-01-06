import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express';

@Injectable()
export class WasabiService {
  private s3: AWS.S3;
  private bucket = process.env.WASABI_BUCKET!;

  constructor() {
    this.s3 = new AWS.S3({
      endpoint: process.env.WASABI_ENDPOINT,
      accessKeyId: process.env.WASABI_ACCESS_KEY,
      secretAccessKey: process.env.WASABI_SECRET_KEY,
      region: process.env.WASABI_REGION,
      signatureVersion: 'v4',
    });
  }

  // UPLOAD (PRIVATE)
  async uploadFile(
    file: Express.Multer.File,
    key?: string,
  ): Promise<string> {
    const ext = file.originalname.split('.').pop();
    const objectKey = key ?? `images/${uuidv4()}.${ext}`;

    await this.s3
      .upload({
        Bucket: this.bucket,
        Key: objectKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();

    return objectKey; // ✅ RETURN KEY ONLY
  }
  // SIGNED URL
  getSignedUrl(key: string, expires = 3600): string {
    return this.s3.getSignedUrl('getObject', {
      Bucket: this.bucket,
      Key: key,
      Expires: expires,
    });
  }

 // ✅ DELETE FILE
  async deleteFile(key: string) {
    await this.s3
      .deleteObject({
        Bucket: this.bucket,
        Key: key,
      })
      .promise();
  }
}