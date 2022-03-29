import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import { IpfsService } from 'src/shared/ipfs/ipfs.service';

@Injectable()
export class DocumentService {
  constructor(private readonly ipfsService: IpfsService) {}

  async uploadToIpfs(files: Express.Multer.File[]) {
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      const fileContent = Buffer.from(files[i].buffer);
      data.append('file', fileContent as any, {
        filepath: `files/${files[i].originalname}`,
      });
    }

    return this.ipfsService.pinFileToIPFS(data);
  }
}
