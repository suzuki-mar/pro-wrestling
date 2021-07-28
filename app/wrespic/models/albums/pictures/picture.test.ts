import { SampleData } from 'sampleData';

describe('isRelated', () => {
  const picture = SampleData.pictures(SampleData.meiName())[0]!;

  it('選手が関係している場合はtrueを返すこと', () => {
    expect(picture.isRelated(SampleData.meiName())).toBeTruthy();
  });
  it('選手が関係していない場合はfalseを返すこと', () => {
    const notRelatedName = SampleData.unknownName();
    expect(picture.isRelated(notRelatedName)).toBeFalsy();
  });
});

export {};
