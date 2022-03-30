import { Module } from '@nestjs/common';
import { IpfsModule } from './ipfs/ipfs.module';
import { AlgorandModule } from './algorand/algorand.module';
import { AesService } from './aes/aes.service';
import { AesModule } from './aes/aes.module';

@Module({
  imports: [IpfsModule, AlgorandModule, AesModule],
})
export class SharedModule {}
