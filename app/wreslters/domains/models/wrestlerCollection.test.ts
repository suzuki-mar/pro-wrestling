import { WrestlerCollection } from './wrestlerCollection';
import { SampleData } from 'sampleData';
import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import { dbClose } from 'test/lib';
import prisma from 'db/index';
import { Wrestler } from './wrestler';

describe('build ＆ wrestlers', () => {
  beforeEach(async () => {
    RepositoryFactory.connectingToRealDB();
    await prisma.$reset();
    await Wrestler.creates(SampleData.wrestlerNames());
  });

  it.skip('配列の順番を確認するテストを実装する', () => {});

  it('レスラー一覧を取得すること', async (done) => {
    const collection = new WrestlerCollection();
    await collection.load();
    const wrestlers = collection.wrestlers();
    expect(wrestlers.length).not.toEqual(0);
    dbClose(done);
  });
});

describe('rebuild', () => {
  it('インスタンスを再構築すること', () => {
    const wrestlers = SampleData.wrestlers();
    const collection = WrestlerCollection.rebuild(wrestlers);

    const rebuildedWrestlerName = collection.wrestlers()[0]!.name;
    expect(rebuildedWrestlerName.equal(wrestlers[0]!.name)).toBeTruthy();
  });
});

export {};
