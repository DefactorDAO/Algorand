import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MintController } from './mint.controller';
import { MintService } from './mint.service';

@Module({
  imports: [HttpModule],
  controllers: [MintController],
  providers: [MintService],
})
export class MintModule {}
