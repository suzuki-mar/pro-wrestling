import { z } from 'zod';
import { SampleData } from 'db/sampleData';
import { IWrestler, TWrestlerName } from 'app/core/wreslter/interface';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { FavoriteWrestlers } from 'app/wrespic/entities/favoriteWrestlers';
import { IFavoriteWrestlers } from 'app/wrespic/components/interface';
import _ from 'lodash';
import { Wrestler } from 'app/core/wreslter/wrestler';
import faker from 'faker';

export const WreslerNames = z.array(
  z.object({
    full: z.string(),
  })
);

export function isExistsWreslerNames(names: WrestlerName[], favoriteWrestlers: IFavoriteWrestlers) {
  const exsitsWrestlers: (IWrestler | undefined)[] = _.map(names, (name: WrestlerName) => {
    const matchs = _.filter(favoriteWrestlers.wrestlers(), (wrestler: Wrestler) => {
      return name.equal(wrestler.name);
    });

    return matchs[0];
  });

  let result = true;
  _.each(exsitsWrestlers, (wrestler) => {
    if (typeof wrestler !== 'object') {
      result = false;
    }
  });

  return result;
}

describe('WreslerNames', () => {
  it('fullがある場合はパースされる', () => {
    const names = SampleData.wrestlerNames();
    expect(WreslerNames.safeParse(names)['success']).toEqual(true);
  });

  it('fullがない場合はパースされない', () => {
    expect(WreslerNames.safeParse({ hoge: 'hoge' })['success']).toEqual(false);
  });
});

describe('isExistsWreslerNames', () => {
  it('存在するNameだけの場合はtrueが返る', async () => {
    const names = SampleData.wrestlerNames();
    const favorites = new FavoriteWrestlers();
    await favorites.load();
    expect(isExistsWreslerNames(names, favorites)).toEqual(true);
  });

  it('存在するNameだけではない場合はfalseが返る', async () => {
    let names = SampleData.wrestlerNames();
    names.push(new WrestlerName(faker.name.firstName()));

    const favorites = new FavoriteWrestlers();
    await favorites.load();
    expect(isExistsWreslerNames(names, favorites)).toEqual(false);
  });
});

export {};
