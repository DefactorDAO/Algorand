import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Version('1')
  @Post('ipfs')
  @UseInterceptors(FilesInterceptor('documents'))
  uploadToIpfs(@UploadedFiles() documents) {
    return this.documentService.uploadToIpfs(documents);
  }
}
