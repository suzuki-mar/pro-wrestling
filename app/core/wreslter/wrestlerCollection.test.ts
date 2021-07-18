import { WrestlerParam } from 'app/core/wreslter';
import { WrestlerCollection } from './wrestlerCollection';
import { SampleData } from 'sampleData';

describe('build ＆ wrestlers', () => {
  it('好きなレスラー一覧を取得すること', async () => {
    const favorteWrestlers = new WrestlerCollection();
    await favorteWrestlers.load();

    const wrestlers = favorteWrestlers.wrestlers();

    expect(wrestlers.length).not.toEqual(0);
  });
});

describe('rebuild', () => {
  it('好きなレスラー一覧を取得すること', () => {
    const wrestler = SampleData.wrestler();
    const favorteWrestlers = new WrestlerCollection();
    const param: WrestlerParam = { name: wrestler.name, id: wrestler.id };
    favorteWrestlers.rebuild([param]);

    const rebuildedWrestlerName = favorteWrestlers.wrestlers()[0]!.name;
    expect(rebuildedWrestlerName.equal(wrestler.name)).toBeTruthy();
  });
});

export {};
