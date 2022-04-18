import { BadRequestException, Injectable } from '@nestjs/common';
import {
  makeAssetCreateTxnWithSuggestedParamsFromObject,
  waitForConfirmation,
} from 'algosdk';
import { AccountService } from 'src/shared/algorand/account/account.service';
import { AlgorandService } from 'src/shared/algorand/algorand.service';
import { IpfsService } from 'src/shared/ipfs/ipfs.service';
import { MintV2Dto } from './dto/mint-v2.dto';
import { hrtime } from 'process';

@Injectable()
export class MintService {
  constructor(
    private readonly algorandService: AlgorandService,
    private readonly ipfsService: IpfsService,
    private readonly accountService: AccountService,
  ) {}

  async mint(data: any) {
    const algoClient = this.algorandService.client();
    const account = this.accountService.getAccountFromEnvMnemonic();
    const pinataResponse = await this.ipfsService.pinJsonToIpfs(data);

    const sp = await algoClient.getTransactionParams().do();

    const txn = makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: account.addr,
      suggestedParams: sp,
      total: 1,
      decimals: 0,
      defaultFrozen: false,
      assetName: 'Defactor_NFT',
      unitName: 'Invoice',
      assetURL: `${process.env.PINATA_API_GATEWAY}/ipfs/${pinataResponse.IpfsHash}`,
      manager: account.addr,
    });

    const rawSignedTnx = txn.signTxn(account.sk);
    const tx = await algoClient.sendRawTransaction(rawSignedTnx).do();
    return waitForConfirmation(algoClient, tx.txId, 4);
  }

  async mintV2(data: MintV2Dto) {
    try {
      const algoClient = this.algorandService.client();
      const account = this.accountService.getAccountFromEnvMnemonic();

      const startPinning = hrtime.bigint();
      const pinataResponse = await this.ipfsService.pinJsonToIpfs(
        data.metadata,
      );
      const endPinning = hrtime.bigint();
      const pinningTime = endPinning - startPinning;

      const sp = await algoClient.getTransactionParams().do();
      const assetIndexes = [];

      const startMinting = hrtime.bigint();
      for (let i = 0; i < data.mint; i++) {
        const txn = makeAssetCreateTxnWithSuggestedParamsFromObject({
          from: account.addr,
          suggestedParams: sp,
          total: 1,
          decimals: 0,
          defaultFrozen: false,
          assetName: 'Defactor_NFT',
          unitName: 'Invoice',
          note: Uint8Array.of(i),
          assetURL: `${process.env.PINATA_API_GATEWAY}/ipfs/${pinataResponse.IpfsHash}`,
        });
        const rawSignedTnx = txn.signTxn(account.sk);
        const tx = await algoClient.sendRawTransaction(rawSignedTnx).do();
        const confirmation = await waitForConfirmation(algoClient, tx.txId, 10);
        assetIndexes[i] = confirmation['asset-index'];
      }
      const endMinting = hrtime.bigint();
      const mintingTime = endMinting - startMinting;

      return {
        assetIndexes,
        responseTime: {
          uint: 'ns',
          pinataService: pinningTime.toString(),
          NftMint: mintingTime.toString(),
        },
      };
    } catch (e) {
      throw new BadRequestException(e.toString());
    }
  }
}
