import { ApiProperty } from '@nestjs/swagger';
import { DocumentStorage } from '../enum/document-storage.enum';

class AssetGoodsType {
  @ApiProperty()
  Description: string;

  @ApiProperty()
  HTSNumber: string;

  @ApiProperty()
  Quantity: number;
}

class Invoice {
  @ApiProperty()
  SupplierCountryCode: string;

  @ApiProperty()
  SupplierName: string;

  @ApiProperty()
  InvoiceNumber: string;

  @ApiProperty()
  InvoiceDate: string;

  @ApiProperty()
  InvoiceDueDate: string;
}

class DocumentDirectory {
  @ApiProperty({ type: 'enum', enum: DocumentStorage })
  storage: DocumentStorage;

  @ApiProperty()
  hash: string;

  @ApiProperty()
  fileNames: [string];
}

export class MintDto {
  @ApiProperty()
  AssetType: string;

  @ApiProperty()
  DebtorCountryCode: string;

  @ApiProperty()
  DebtorName: string;

  @ApiProperty()
  DebtorTaxNumber: string;

  @ApiProperty()
  DebtorCompanyNumber: string;

  @ApiProperty()
  Amount: number;

  @ApiProperty()
  CurrencyCode: string;

  @ApiProperty()
  TransactionRiskScore: string;

  @ApiProperty()
  ExternalId: string;

  @ApiProperty()
  IndustryId: number;

  @ApiProperty()
  RepaymentDate: string;

  @ApiProperty()
  FinancialServiceTypeId: number;

  @ApiProperty()
  DebtorUniqueId: string;

  @ApiProperty()
  Incoterm: string;

  @ApiProperty({ type: [AssetGoodsType] })
  AssetGoodsTypes: AssetGoodsType[];

  @ApiProperty()
  Invoice: Invoice;

  @ApiProperty()
  DocumentDirectory: DocumentDirectory;
}
