import { IHTTPClient } from 'integrations/httpClient/interface';
import axios from 'axios';

export class HTTPClient implements IHTTPClient {
  async findBlobParts(url: URL): Promise<BlobPart[]> {
    return await axios
      .get(url.toString(), {
        responseType: 'arraybuffer',
      })
      .then((response) => {
        return [response.data];
      });
  }
}
