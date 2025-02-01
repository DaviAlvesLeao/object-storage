import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { FileType, MinioService, PhotoType } from './minio.service';

type PhotoPayload = {
  File: Express.Multer.File;
  type: PhotoType;
};

@Controller()
export class MinioController {
  constructor(private readonly minioService: MinioService) {}
  @EventPattern('save_document')
  async handlePhotoCreate(@Payload() data: any) {
    console.log('Recived message');
    await this.minioService.savePhoto(data.File as FileType, data.type);
  }
  @EventPattern('save_documents')
  async handlePhotoBatch(@Payload() data: any) {
    console.log('Recived message');
    await this.minioService.savePhotos(data.Files as FileType[], data.type);
  }
}
