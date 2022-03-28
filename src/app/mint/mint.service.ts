import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/shared/algorand/account/account.service';
import { IpfsService } from 'src/shared/ipfs/ipfs.service';

@Injectable()
export class MintService {
  constructor(
    private readonly ipfsService: IpfsService,
    private readonly accountService: AccountService,
  ) {}

  async mint(data: any) {
    const account = this.accountService.getAccountFromEnvMnemonic();
    const pinataResponse = await this.ipfsService.pinJsonToIpfs(data);
  }
}
