import { TSource } from 'app/wrespic';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import faker from 'faker';
import { SampleData } from 'sampleData';
import { Picture } from './picture';

describe('isRelated', () => {
  const source: TSource = SampleData.sources()[0]!;
  let picture = Picture.buildFromSource(source);
  picture = Picture.rebuildWtihWrestlerNames(picture, [source.name]);

  it('選手が関係している場合はtrueを返すこと', () => {
    expect(picture.isRelated(source.name)).toBeTruthy();
  });

  it('選手が関係していない場合はfalseを返すこと', () => {
    const notRelatedName = new WrestlerName(faker.name.firstName());
    expect(picture.isRelated(notRelatedName)).toBeFalsy();
  });
});

export {};
