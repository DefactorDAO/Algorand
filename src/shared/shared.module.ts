import { Module } from '@nestjs/common';
import { IpfsModule } from './ipfs/ipfs.module';
import { AlgorandModule } from './algorand/algorand.module';

@Module({
  imports: [IpfsModule, AlgorandModule]
})
export class SharedModule {}
