import { SampleData } from 'sampleData';
import { SourceCollection } from './sourceCollection';
import { ClientFactory } from 'integrations/clientFactory';
import { RepositoryFactory } from 'db/repositrories/repositoryFactory';

describe('load', () => {
  let collection: SourceCollection;

  beforeEach(() => {
    collection = new SourceCollection();
  });

  it.skip('Sourceを取得すること', async () => {
    await collection.load([SampleData.meiName(), SampleData.mioName()]);

    const sources = collection.sources();

    expect(sources.length).toEqual(2);
  });

  it.skip('取得したデータの型があっていること', async () => {
    await collection.load([SampleData.meiName(), SampleData.mioName()]);

    const source = collection.sources()[0]!;

    expect(source.imageURL).not.toBeUndefined();
  });

  describe('実際のAPIにつなげる処理 必要になるとき以外Skipするs', () => {
    beforeEach(() => {
      RepositoryFactory.connectingToRealDB();
      ClientFactory.connectingToExternalAPI();
    });

    afterEach(() => {
      ClientFactory.resetStatus();
      RepositoryFactory.resetStatus();
    });

    it('コレクションをレスラー名順にロードできていること', async () => {
      const names = SampleData.wrestlerNames();
      await collection.load(names);

      const firstSourceWrestlerName = collection.sources()[0]!.name;
      expect(firstSourceWrestlerName.equal(names[0])).toBeTruthy();

      const lastIndex = collection.sources().length - 1;
      const lastSourceWrestlerName = collection.sources()[lastIndex]!.name;
      expect(lastSourceWrestlerName.equal(names[names.length - 1])).toBeTruthy();
    });
  });
});

describe.skip('filterFromSelected', () => {
  const collection = new SourceCollection();

  beforeEach(async () => {
    await collection.load([SampleData.meiName(), SampleData.mioName()]);
  });

  it('指定したレスラーだけ取得すること', () => {
    const beforeCount = collection.sources().length;
    const afterCount = collection.filterFromSelected([SampleData.meiName()]).length;
    expect(afterCount).toBeLessThan(beforeCount);
  });
});

export {};
