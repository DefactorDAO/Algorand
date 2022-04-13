import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AlgorandModule } from 'src/shared/algorand/algorand.module';
import { NftController } from './nft.controller';
import { NftService } from './nft.service';

@Module({
  imports: [AlgorandModule, HttpModule],
  controllers: [NftController],
  providers: [NftService],
})
export class NftModule {}
