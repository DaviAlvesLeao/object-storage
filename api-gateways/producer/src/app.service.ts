import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('MINIO_MICROSERVICE') private readonly minioClient: ClientKafka,
    @Inject('PDF_MICROSERVICE') private readonly pdfClient: ClientKafka,
  ) {}
  // File type wwill cnage

  onModuleInit() {
    this.minioClient.subscribeToResponseOf('save_document');
  }

  saveDoc(file: Express.Multer.File, type: string) {
    this.minioClient.emit('save_document', { File: file, type });
  }

  saveDocs(files: Express.Multer.File[], type: string) {
    files.map(async (file) =>
      this.minioClient.emit('save_document', { File: file, type }),
    );
  }
  savePDF(file: Express.Multer.File) {
    this.pdfClient.emit('save_pdf_document', file);
  }
}
