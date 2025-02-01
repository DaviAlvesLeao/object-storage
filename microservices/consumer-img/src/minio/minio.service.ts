import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { v4 as uuidv4 } from 'uuid';

export type FileType = Express.Multer.File;
export type PhotoType = 'png' | 'jpg' | 'svg';

@Injectable()
export class MinioService implements OnModuleInit {
  private readonly photoBuckets: string = 'photos-bucket';
  private readonly minioClient: Minio.Client;

  constructor(private readonly configService: ConfigService) {
    const minioConfig = this.configService.get('MINIO');
    this.minioClient = new Minio.Client(minioConfig);
  }
  async onModuleInit() {
    const exists = await this.minioClient.bucketExists(this.photoBuckets);
    if (!exists) {
      await this.minioClient.makeBucket(this.photoBuckets, 'us-east-1');
    }
  }

  async savePhoto(file: FileType, type: PhotoType) {
    console.log(file, type);
    const metaData = {
      'Content-Type': 'text/plain',
      'X-Amz-Meta-Testing': 1234,
      example: 5678,
    };
    const destinationObject = `photo-${uuidv4()}.${type}`;
    await this.minioClient.putObject(
      this.photoBuckets,
      destinationObject,
      Buffer.from(file.buffer),
    );
    console.log(
      'File ' +
        `${file.buffer.toString()}` +
        ' uploaded as object ' +
        destinationObject +
        ' in bucket ' +
        this.photoBuckets,
    );
  }

  async savePhotos(files: FileType[], type: PhotoType) {
    files.map(async (f) => {
      await this.savePhoto(f, type);
    });
  }
}
