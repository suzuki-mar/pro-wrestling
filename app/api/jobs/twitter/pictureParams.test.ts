import { Wrestler } from 'app/wreslters/domains/models/wrestler';
import { ExternalServiceClientFactory } from 'infrastructure/externalServiceClientFactoryclientFactory';
import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import { SampleData } from 'sampleData';
import { execute } from './pictureParams';
import prisma from 'db/index';
import { dbClose } from 'test/lib';

describe('モックを使用するケース', () => {
  it('データをロードすること', async () => {
    const acutal = await execute();
    expect(acutal[0]!['url']).not.toBeUndefined();
    expect(acutal[0]!['names']).not.toBeUndefined();
  });
});

describe.skip('実際のAPIやDBにつなげるケース 必要なとき以外はSKIP テストが失敗してしまっている #104のIssueで修正する', () => {
  beforeEach(async (done) => {
    RepositoryFactory.connectingToRealDB();
    ExternalServiceClientFactory.connectingToExternalAPI();
    await prisma.$reset();

    await Wrestler.creates(SampleData.wrestlerNames());
    dbClose(done);
  });

  it('データをロードすること', async (done) => {
    const acutal = await execute();
    expect(acutal.length).toBeGreaterThanOrEqual(100);

    dbClose(done);
  });
});
