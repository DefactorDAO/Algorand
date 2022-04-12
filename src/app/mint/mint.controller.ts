import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MintV2Dto } from './dto/mint-v2.dto';
import { MintDto } from './dto/mint.dto';
import { MintService } from './mint.service';

@ApiTags('NFT')
@Controller('mint')
export class MintController {
  constructor(private readonly mintService: MintService) {}

  @Version('1')
  @Post()
  @ApiOperation({ summary: 'creating nft with payload' })
  mint(@Body() data: MintDto) {
    return this.mintService.mint(data);
  }

  @Version('2')
  @Post()
  @ApiOperation({ summary: 'mint nft with preffered times' })
  mintV2(@Body() data: MintV2Dto) {
    return this.mintService.mintV2(data);
  }
}
