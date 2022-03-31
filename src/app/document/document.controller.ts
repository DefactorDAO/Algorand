import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFiles,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DocumentService } from './document.service';
import { FilesUploadDto } from './dto/files-upload.dto';
import { PassThrough } from 'stream';

@ApiTags('Document')
@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Version('1')
  @Get('ipfs/:ipfsHash')
  @ApiOperation({ summary: 'get the files in directory' })
  async getIpfsData(
    @Res() res,
    @Param('ipfsHash') ipfsHash: string,
    @Query('fileName') fileName: string,
  ) {
    const ipfsFile = await this.documentService.getIpfsData(ipfsHash, fileName);
    res.set({
      'Content-Disposition': `attachment; filename=${fileName}`,
    });

    var readStream = new PassThrough();
    readStream.end(ipfsFile);

    readStream.pipe(res);
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
