import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class IpfsService {
  constructor(private readonly httpService: HttpService) {}

  async pinJsonToIpfs(json): Promise<AxiosResponse> {
    const httpObs = this.httpService.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      json,
      {
        headers: {
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
        },
      },
    );
    return (await lastValueFrom(httpObs)).data;
  }
}
