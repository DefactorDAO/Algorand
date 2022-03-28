import { Module } from '@nestjs/common';
import { IpfsModule } from './ipfs/ipfs.module';

@Module({
  imports: [IpfsModule]
})
export class SharedModule {}
