import { TSource } from 'app/wrespic';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import faker from 'faker';
import { SampleData } from 'sampleData';
import { Picture } from './picture';
import MockDate from 'mockdate';

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

describe('rebuildWtihWrestlerNames', () => {
  it('レスラーの名前が同じものが複数ある場合でも一つにする', () => {
    const names = [SampleData.meiName(), SampleData.meiName()];
    const source = SampleData.source(SampleData.meiName());
    let picture = Picture.buildFromSource(source);
    picture = Picture.rebuildWtihWrestlerNames(picture, names);

    expect(picture.wrestlerNames.length).toEqual(1);
  });
});

describe('fileName', () => {
  it('時間までをファイル名に含める', () => {
    let picture = SampleData.picturesOfMei()[0]!;
    picture = Picture.rebuildWtihUniqueFileName(picture);

    // 以下のような形式になる 星月芽依_20210719_03_541
    expect(picture.fileName!.length).not.toBeGreaterThan(21);
  });
});

describe('displayName', () => {
  beforeAll(() => {
    MockDate.set('2021-08-01 21:00:00');
  });
  afterAll(() => {
    MockDate.reset();
  });

  it('選手名選手名: YYYY M.Dの形式を返す', () => {
    const date = new Date();

    let picture = SampleData.picturesOfMei()[0]!;
    const source = Object.assign(picture.source, { date: date });
    picture = Object.assign(picture, {
      source: source,
      wrestlerNames: [SampleData.meiName(), SampleData.mioName()],
    });
    const actual = `${SampleData.meiName().full}:${SampleData.mioName().full} 2021 8.1`;
    expect(picture.displayName()).toEqual(actual);
  });
});

export {};
