import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { FilesUploadDto } from './dto/files-upload.dto';

@ApiTags('Document')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Version('1')
  @Post('ipfs')
  @ApiOperation({ summary: 'uploading multiple documents to IPFS' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDto })
  @UseInterceptors(FilesInterceptor('documents'))
  uploadToIpfs(@UploadedFiles() documents) {
    return this.documentService.uploadToIpfs(documents);
  }
}
