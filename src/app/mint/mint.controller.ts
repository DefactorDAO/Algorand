import { Body, Controller, Post, Version } from '@nestjs/common';
import { MintService } from './mint.service';

@Controller('mint')
export class MintController {
  constructor(private readonly mintService: MintService) {}

  @Version('1')
  @Post()
  mint(@Body() data: any) {
    return this.mintService.mint(data);
  }
}
