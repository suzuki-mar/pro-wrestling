import { IHTTPClient } from 'integrations/httpClient/interface';
import axios from 'axios';

export class HTTPClient implements IHTTPClient {
  async findBlobParts(urlStr: string): Promise<BlobPart[]> {
    console.log(urlStr);

    return await axios
      .get(urlStr, {
        responseType: 'arraybuffer',
      })
      .then((response) => {
        return [response.data];
      });
  }
}
