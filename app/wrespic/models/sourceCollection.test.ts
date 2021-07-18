import { SampleData } from 'sampleData';
import { SourceCollection } from './sourceCollection';

describe('load', () => {
  it('Sourceを取得すること', async () => {
    const collection = new SourceCollection();

    await collection.load([SampleData.meiName(), SampleData.mioName()]);

    const sources = collection.sources();

    console.log(collection);
    // FIX テストを充実させたい
    expect(sources.length).toEqual(2);
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
