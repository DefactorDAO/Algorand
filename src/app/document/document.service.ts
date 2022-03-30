import { Injectable } from '@nestjs/common';
import { AesService } from 'src/shared/aes/aes.service';
import { IpfsService } from 'src/shared/ipfs/ipfs.service';
import * as FormData from 'form-data';

@Injectable()
export class DocumentService {
  constructor(
    private readonly ipfsService: IpfsService,
    private readonly aesService: AesService,
  ) {}

  async getIpfsData(ipfsHash: string) {
    return this.ipfsService.getPinnedData(ipfsHash);
  }

  async uploadToIpfs(files: Express.Multer.File[]) {
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      const encrypted = this.aesService.encrypt(files[i].buffer);
      const fileContent = Buffer.from(encrypted);
      data.append('file', fileContent as any, {
        filepath: `files/${files[i].originalname}`,
      });
    }
    return this.ipfsService.pinFilesToIPFS(data);
  }
}
