import { Module } from '@nestjs/common';
import { IpfsModule } from 'src/shared/ipfs/ipfs.module';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

@Module({
  imports: [IpfsModule],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
