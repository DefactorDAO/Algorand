import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AesModule } from '../aes/aes.module';
import { IpfsService } from './ipfs.service';

@Module({
  imports: [HttpModule, AesModule],
  providers: [IpfsService],
  exports: [IpfsService],
})
export class IpfsModule {}
