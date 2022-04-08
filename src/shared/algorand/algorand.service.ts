import { Injectable } from '@nestjs/common';
import { Algodv2 } from 'algosdk';

@Injectable()
export class AlgorandService {
  constructor() {}

  client() {
    const { ALGOD_TOKEN, ALGOD_ADDRESS, ALGOD_PORT } = process.env;
    return new Algodv2(ALGOD_TOKEN, ALGOD_ADDRESS, ALGOD_PORT);
  }
}
