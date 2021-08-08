import { WrestlerCollection } from 'app/wreslters/domains/models/wrestlerCollection';
import prisma from 'db/index';
import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import fetchWrestlerCollection from './fetchWrestlerCollection';
import { dbClose } from 'test/lib';
import { Wrestler } from 'app/wreslters/domains/models/wrestler';
import { SampleData } from 'sampleData';

describe('実際のDBを使用する', () => {
  beforeEach(async () => {
    RepositoryFactory.connectingToRealDB();
    await prisma.$reset();
    await Wrestler.creates(SampleData.wrestlerNames());
  });

  it('レスラーコレクションを取得すること', async (done) => {
    const wrestlerCollection = await fetchWrestlerCollection();
    expect(wrestlerCollection).toBeInstanceOf(WrestlerCollection);
    dbClose(done);
  });
});
