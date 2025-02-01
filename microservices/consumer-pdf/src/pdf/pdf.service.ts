import { Injectable } from '@nestjs/common';
import * as pdf from 'pdf-parse';
import * as Tesseract from 'tesseract.js';
import * as fs from 'fs';

@Injectable()
export class PdfService {
  async create(data: any) {
    console.log(`pdf here`);
    console.log(await this.extractTextFromPdf(data.buffer));
  }

  async extractTextFromPdf(dataBuffer: Buffer): Promise<string> {
    try {
      const data = await pdf(dataBuffer);
      if (data.text.trim()) {
        return data.text; // Retorna texto se disponível no PDF
      }
    } catch (error) {
      console.error('Erro ao extrair texto do PDF:', error);
    }

    // Se o PDF não tiver texto, tentar OCR nas imagens
    return this.extractTextFromImage(dataBuffer);
  }

  async extractTextFromImage(imageBuffer: Buffer): Promise<string> {
    const result = await Tesseract.recognize(imageBuffer, 'eng', {
      logger: (m) => console.log(m), // Optional: For logging progress
    }).then(({ data: { text } }) => {
      console.log('Recognized text:', text);
      return text;
    }); // Pode ajustar para 'por' se precisar de português
    return result;
  }
}
