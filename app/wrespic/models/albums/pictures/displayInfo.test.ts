import { SampleData } from 'sampleData';
import MockDate from 'mockdate';
import { DisplayInfo } from './displayInfo';

describe('displayName', () => {
  beforeAll(() => {
    MockDate.set('2021-08-01 21:00:00');
  });
  afterAll(() => {
    MockDate.reset();
  });

  it('選手名選手名: YYYY M.Dの形式を返す', () => {
    let info = SampleData.pictures(SampleData.meiName())[0]!.displayInfo;
    info = DisplayInfo.mergeFromWreslerNames([SampleData.mioName()], info);

    const actual = `${SampleData.meiName().full}:${SampleData.mioName().full} 2021 8.1`;
    expect(info.formattedDisplayString()).toEqual(actual);
  });
});

export {};
