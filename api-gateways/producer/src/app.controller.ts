import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('type') type: string,
  ) {
    this.appService.saveDoc(file, type);
  }

  @Post('/batch')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadBatchFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('type') type: string,
  ) {
    console.log(`bach`, files);
    this.appService.saveDocs(files, type);
  }

  @Post('/pdf')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPDFFile(@UploadedFile() file: Express.Multer.File) {
    console.log(`PDF`, file);
    this.appService.savePDF(file);
  }

  @Get()
  on(@Res() res: Response) {
    res.send(`server is on`);
  }
}
