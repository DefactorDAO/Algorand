import { Module } from '@nestjs/common';
import { AlgorandModule } from 'src/shared/algorand/algorand.module';
import { IpfsModule } from 'src/shared/ipfs/ipfs.module';
import { MintController } from './mint.controller';
import { MintService } from './mint.service';

@Module({
  imports: [IpfsModule, AlgorandModule],
  controllers: [MintController],
  providers: [MintService],
})
export class MintModule {}
