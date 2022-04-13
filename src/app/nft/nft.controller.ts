import { Controller, Get, Param, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NftService } from './nft.service';

@ApiTags('NFT')
@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Version('1')
  @Get()
  get() {
    return this.nftService.get();
  }

  @Version('1')
  @Get(':assetId')
  getByAssetId(@Param('assetId') assetId: string) {
    return this.nftService.getByAssetId(assetId);
  }
}
