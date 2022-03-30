import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom } from 'rxjs';
import { PinataResponseDto } from './dto/pinata-response.dto';
import { PinataPins } from './enum/pinata-endpoint.enum';
import * as FormData from 'form-data';

@Injectable()
export class IpfsService {
  private endPoint = 'https://api.pinata.cloud/pinning';

  constructor(private readonly httpService: HttpService) {}

  async getPinnedData(ipfsHash: string) {
    return ipfsHash;
  }

  async pinJsonToIpfs(json) {
    return this.pinataRequest(PinataPins.JSON_TO_IPFS, json);
  }

  async pinFilesToIPFS(files: FormData) {
    return this.pinataRequest(PinataPins.FILE_TO_IPFS, files);
  }

  // ----------- non controller methods -------------

  private async pinataRequest(uri, data): Promise<PinataResponseDto> {
    const config: AxiosRequestConfig = {
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
      },
    };
    if (uri == PinataPins.FILE_TO_IPFS) {
      config.maxContentLength = -1;
      config.headers[
        'Content-Type'
      ] = `multipart/form-data; boundary=${data?.['_boundary']}`;
    }
    const httpObs = this.httpService.post(
      `${this.endPoint}/${uri}`,
      data,
      config,
    );
    return (await lastValueFrom(httpObs)).data;
  }
}
