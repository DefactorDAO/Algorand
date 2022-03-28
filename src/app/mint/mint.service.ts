import { Injectable } from '@nestjs/common';
import { IpfsService } from 'src/shared/ipfs/ipfs.service';

@Injectable()
export class MintService {
  constructor(private readonly ipfsService: IpfsService) {}

  async mint(data: any) {
    return this.ipfsService.pinJsonToIpfs(data);
  }
}
