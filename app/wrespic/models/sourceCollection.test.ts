import { SampleData } from 'sampleData';
import { SourceCollection } from './sourceCollection';

describe('load', () => {
  it('Sourceを取得すること', async () => {
    const collection = new SourceCollection();

    await collection.load([SampleData.meiName(), SampleData.mioName()]);

    const sources = collection.sources();

    expect(sources.length).toEqual(2);
  });

  it('取得したデータの型があっていること', async () => {
    const collection = new SourceCollection();

    await collection.load([SampleData.meiName(), SampleData.mioName()]);

    const source = collection.sources()[0]!;

    expect(source.imageURL).not.toBeUndefined();
  });
});

describe('filterFromSelected', () => {
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
