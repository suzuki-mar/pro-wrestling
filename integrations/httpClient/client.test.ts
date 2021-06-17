import { HTTPClient } from 'integrations/httpClient/client';
import { SampleData } from 'db/sampleData';

describe('HTTPClient', () => {
  describe('外部ネットワークへの接続なため必要なとき以外はテストをしない', () => {
    const client = new HTTPClient();

    describe('findBlobParts', () => {
      it('BlogPartsをを取得できること', async () => {
        const result: BlobPart[] = await client.findBlobParts(SampleData.url());
        expect(result[0]?.toString()).not.toBeUndefined();
      });
    });
  });
});

export {};
