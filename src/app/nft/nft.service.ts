import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AccountService } from 'src/shared/algorand/account/account.service';
import { AlgorandService } from 'src/shared/algorand/algorand.service';
import { AssetEntity } from '../mint/entity/asset.entity';

@Injectable()
export class NftService {
  constructor(
    private readonly accountService: AccountService,
    private readonly algorandService: AlgorandService,
    private readonly httpService: HttpService,
  ) {}

  async get() {
    const algoClient = this.algorandService.client();
    const account = this.accountService.getAccountFromEnvMnemonic();
    const accountInfo = await algoClient.accountInformation(account.addr).do();
    return accountInfo['created-assets'];
  }

  async getByAssetId(id: string) {
    const algoClient = this.algorandService.client();
    const account = this.accountService.getAccountFromEnvMnemonic();

    try {
      const assetInfo = await algoClient
        .accountAssetInformation(account.addr, parseInt(id))
        .do();

      const metadata = (
        await lastValueFrom(
          this.httpService.get(assetInfo?.['created-asset']?.url),
        )
      ).data;

      const privateData = await AssetEntity.findOne({ assetId: parseInt(id) });

      const asset = {
        assetInfo: assetInfo['created-asset'],
        privateData,
        metadata,
      };

      return asset;
    } catch (e) {
      throw new NotFoundException(e.toString());
    }
  }
}
