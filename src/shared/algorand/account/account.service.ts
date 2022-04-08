import { Injectable } from '@nestjs/common';
import { mnemonicToSecretKey } from 'algosdk';

@Injectable()
export class AccountService {
  getAccountFromEnvMnemonic() {
    return mnemonicToSecretKey(process.env.MNEMONIC);
  }
}
