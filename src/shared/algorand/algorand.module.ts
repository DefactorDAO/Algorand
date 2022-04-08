import { Module } from '@nestjs/common';
import { AlgorandService } from './algorand.service';
import { AccountService } from './account/account.service';

@Module({
  providers: [AlgorandService, AccountService],
  exports: [AlgorandService, AccountService],
})
export class AlgorandModule {}
