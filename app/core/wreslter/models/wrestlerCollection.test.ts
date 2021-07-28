import { WrestlerCollection } from './wrestlerCollection';
import { SampleData } from 'sampleData';

describe('build ＆ wrestlers', () => {
  it('レスラー一覧を取得すること', async () => {
    const collection = new WrestlerCollection();
    await collection.load();

    const wrestlers = collection.wrestlers();

    expect(wrestlers.length).not.toEqual(0);
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
