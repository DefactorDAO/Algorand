import { Injectable } from '@nestjs/common';
import { AesService } from 'src/shared/aes/aes.service';
import { IpfsService } from 'src/shared/ipfs/ipfs.service';
import * as FormData from 'form-data';

@Injectable()
export class DocumentService {
  constructor(
    private readonly ipfsService: IpfsService,
    private readonly aesService: AesService,
  ) {}

  async getIpfsData(ipfsHash: string, fileName) {
    return this.ipfsService.getPinnedData(ipfsHash, fileName);
  }

  async getIpfsEncData(ipfsHash: string, fileName) {
    const encryptedBase64 = await this.ipfsService.getPinnedData(
      ipfsHash,
      fileName,
    );
    const encryptedBuffer = Buffer.from(encryptedBase64, 'base64');
    const filecontent = this.aesService.decrypt(encryptedBuffer);
    return filecontent;
  }

  async uploadToIpfs(files: Express.Multer.File[]) {
    const data = new FormData();
    const fileNames = [];
    for (let i = 0; i < files.length; i++) {
      const fileContent = Buffer.from(files[i].buffer);
      fileNames.push(files[i].originalname);
      data.append('file', fileContent as any, {
        filepath: `files/${files[i].originalname}`,
      });
    }
    const pinataReponse = await this.ipfsService.pinFilesToIPFS(data);
    pinataReponse['FileNames'] = fileNames;
    return pinataReponse;
  }

  async uploadEncToIpfs(files: Express.Multer.File[]) {
    const data = new FormData();
    const fileNames = [];
    for (let i = 0; i < files.length; i++) {
      fileNames.push(files[i].originalname);
      const encryptedFileBase64 = Buffer.from(
        this.aesService.encrypt(files[i].buffer),
      ).toString('base64');
      data.append('file', encryptedFileBase64, {
        filepath: `files/${files[i].originalname}`,
      });
    }
    const pinataReponse = await this.ipfsService.pinFilesToIPFS(data);
    pinataReponse['FileNames'] = fileNames;
    return pinataReponse;
  }
}
