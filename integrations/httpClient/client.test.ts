import { HTTPClient } from 'integrations/httpClient/client';
import { SampleData } from 'sampleData';

describe('HTTPClient', () => {
  describe('外部ネットワークへの接続なため必要なとき以外はテストをしない', () => {
    const client = new HTTPClient();

    describe.skip('findBlobParts あとで実装をする', () => {
      it('BlogPartsをを取得できること', async () => {
        const result: BlobPart[] = await client.findBlobParts(SampleData.url().href);

        console.log(new File(result, 'test'));
        // expect(result[0]).toBeInstanceOf(ArrayBuffer)
      });
    });
  });
});

export {};
