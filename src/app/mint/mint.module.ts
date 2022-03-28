import { Module } from '@nestjs/common';
import { MintController } from './mint.controller';

@Module({
  controllers: [MintController]
})
export class MintModule {}
