import { Injectable } from '@nestjs/common';
import {
  makeAssetCreateTxnWithSuggestedParamsFromObject,
  waitForConfirmation,
} from 'algosdk';
import { AccountService } from 'src/shared/algorand/account/account.service';
import { AlgorandService } from 'src/shared/algorand/algorand.service';
import { IpfsService } from 'src/shared/ipfs/ipfs.service';

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
}