import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: "https://s3.wasabisys.com",
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY!,
    secretAccessKey: process.env.WASABI_SECRET_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { fileName, fileType } = await req.json();

    const command = new PutObjectCommand({
      Bucket: process.env.WASABI_BUCKET_NAME!,
      Key: fileName,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });

    return NextResponse.json({ url: signedUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate signed URL" }, { status: 500 });
  }
}
