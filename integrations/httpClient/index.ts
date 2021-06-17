export interface IHTTPClient {
  findBlobParts(url: URL): Promise<BlobPart[]>;
}
