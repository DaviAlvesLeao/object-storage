import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PdfService } from './pdf.service';

@Controller()
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @EventPattern('save_pdf_document')
  create(@Payload() data: any) {
    return this.pdfService.create(data);
  }
}
