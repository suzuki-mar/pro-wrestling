import { WrestlerParam } from 'app/core/wreslter';
import { FavoriteWrestlers } from 'app/wrespic/models/favoriteWrestlers';
import { SampleData } from 'sampleData';

describe('build ＆ wrestlers', () => {
  it('好きなレスラー一覧を取得すること', async () => {
    const favorteWrestlers = new FavoriteWrestlers();
    await favorteWrestlers.build();

    const wrestlers = favorteWrestlers.wrestlers();

    expect(wrestlers.length).not.toEqual(0);
  });
});

describe('rebuild', () => {
  it('好きなレスラー一覧を取得すること', () => {
    const wrestler = SampleData.wrestler();
    const favorteWrestlers = new FavoriteWrestlers();
    const param: WrestlerParam = { name: wrestler.name, id: wrestler.id };
    favorteWrestlers.rebuild([param]);

    const rebuildedWrestlerName = favorteWrestlers.wrestlers()[0]!.name;
    expect(rebuildedWrestlerName.equal(wrestler.name)).toBeTruthy();
  });
});

export {};
