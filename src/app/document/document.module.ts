import { Module } from '@nestjs/common';
import { AesModule } from 'src/shared/aes/aes.module';
import { IpfsModule } from 'src/shared/ipfs/ipfs.module';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

@Module({
  imports: [IpfsModule, AesModule],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
