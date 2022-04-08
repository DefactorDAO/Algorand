import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
}
