import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
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
  @Get('ipfs/:ipfsHash')
  @ApiOperation({ summary: 'get the file in directory' })
  getIpfsData(
    @Param('ipfsHash') ipfsHash: string,
    @Query('fileName') fileName: string,
  ) {
    return this.documentService.getIpfsData(ipfsHash, fileName);
  }

  @Version('1')
  @Post('ipfs')
  @ApiOperation({ summary: 'uploading multiple documents to IPFS' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDto })
  @UseInterceptors(FilesInterceptor('documents'))
  uploadToIpfs(@UploadedFiles() documents) {
    return this.documentService.uploadToIpfs(documents);
  }

  @Version('2')
  @Post('ipfs')
  @ApiOperation({
    summary: 'uploading multiple documents to IPFS as Encrypted',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDto })
  @UseInterceptors(FilesInterceptor('documents'))
  uploadEncToIpfs(@UploadedFiles() documents) {
    return this.documentService.uploadEncToIpfs(documents);
  }
}
