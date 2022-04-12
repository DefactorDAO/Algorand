import { ApiProperty } from '@nestjs/swagger';
import { DocumentStorage } from '../enum/document-storage.enum';

class Buyer {
  @ApiProperty()
  industry: string;
}

class Customer {
  @ApiProperty()
  name: string;

  @ApiProperty()
  dunsNumber: number;

  @ApiProperty()
  industry: string;

  @ApiProperty()
  lei: string;

  @ApiProperty()
  isin: string;
}

class InvoiceFiles {
  @ApiProperty()
  insuranceTerms: string;

  @ApiProperty()
  hash: string;

  @ApiProperty()
  publicAddress: string;
}

class Scoring {
  @ApiProperty()
  esgScore: number;

  @ApiProperty()
  surfScore: number;

  @ApiProperty()
  accurencyRatio: number;
}

class Trade {
  @ApiProperty()
  crowdsInsurance: string;
}

class Documents {
  @ApiProperty({ type: 'enum', enum: DocumentStorage })
  storage: DocumentStorage;

  @ApiProperty()
  hash: string;

  @ApiProperty()
  fileNames: [string];
}

class MetaData {
  @ApiProperty()
  docNum: number;

  @ApiProperty()
  buyer: Buyer;

  @ApiProperty()
  customer: Customer;

  @ApiProperty()
  country: string;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  totalInvoiceAmount: number;

  @ApiProperty()
  termsDiscountDayDue: string;

  @ApiProperty()
  invoiceFiles: InvoiceFiles;

  @ApiProperty()
  repayAmount: number;

  @ApiProperty()
  originalInvoiceAmount: number;

  @ApiProperty()
  docDtm: Date;

  @ApiProperty()
  dueData: Date;

  @ApiProperty()
  repaydueDate: Date;

  @ApiProperty()
  scoring: Scoring;

  @ApiProperty()
  trade: Trade;

  @ApiProperty()
  documents: Documents;
}

export class MintV2Dto {
  @ApiProperty()
  metadata: MetaData;
  @ApiProperty()
  mint: number;
}
