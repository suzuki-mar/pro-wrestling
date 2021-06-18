import { SampleData } from 'db/sampleData';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { FavoriteWrestlers } from 'app/wrespic/entities/favoriteWrestlers';
import { WreslerNames, isExistsWreslerNames } from 'app/wrespic/validation';
import faker from 'faker';

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
