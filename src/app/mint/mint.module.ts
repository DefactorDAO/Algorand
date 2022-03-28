import { Module } from '@nestjs/common';
import { IpfsModule } from 'src/shared/ipfs/ipfs.module';
import { MintController } from './mint.controller';
import { MintService } from './mint.service';

@Module({
  imports: [IpfsModule],
  controllers: [MintController],
  providers: [MintService],
})
export class MintModule {}
