import { SampleData } from 'sampleData';
import { WrestlerCollection } from 'app/wreslters/domains/models/wrestlerCollection';
import { WreslerNames, isExistsWreslerNames } from './validation';

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
    const collection = new WrestlerCollection();
    await collection.load();
    expect(isExistsWreslerNames(names, collection)).toEqual(true);
  });

  it('存在するNameだけではない場合はfalseが返る', async () => {
    let names = SampleData.wrestlerNames();
    names = [...names, SampleData.unknownName()];
    const collection = new WrestlerCollection();
    await collection.load();
    expect(isExistsWreslerNames(names, collection)).toEqual(false);
  });
});

export {};
