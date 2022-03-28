import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MintService {
  constructor(private readonly httpService: HttpService) {}

  async mint(data: any) {
    const ipfsUrl = await this.pinToIpfs(data);
    return ipfsUrl;
  }

  private async pinToIpfs(data) {
    const httpObs = this.httpService.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      data,
      {
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
        },
      },
    );
    const pinataRes = await lastValueFrom(httpObs);
    const url = `${process.env.PINATA_API_GATEWAY}/ipfs/${pinataRes['data']['IpfsHash']}`;
    return url;
  }
}
