import { Injectable } from '@nestjs/common';
import { IpfsService } from 'src/shared/ipfs/ipfs.service';

@Injectable()
export class DocumentService {
  constructor(private readonly ipfsService: IpfsService) {}

  async uploadToIpfs(files: Express.Multer.File[]) {
    return this.ipfsService.pinFilesToIPFS(files);
  }
}
