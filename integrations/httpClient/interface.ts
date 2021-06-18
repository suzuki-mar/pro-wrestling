export interface IHTTPClient {
  findBlobParts(urlStr: string): Promise<BlobPart[]>;
}
