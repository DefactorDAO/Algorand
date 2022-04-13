import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MintModule } from './mint/mint.module';
import { DocumentModule } from './document/document.module';
import { NftModule } from './nft/nft.module';

@Module({
  imports: [ConfigModule.forRoot(), MintModule, DocumentModule, NftModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
