import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MintModule } from './mint/mint.module';
import { DocumentModule } from './document/document.module';
import { NftModule } from './nft/nft.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig()),
    MintModule,
    DocumentModule,
    NftModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
