import { TPictureContributor, TPictureDisplayInfo } from 'app/albums';
import faker from 'faker';
import { SampleData } from 'sampleData';
import { TWrestlerName } from 'app/wreslters';
import { FileNameCreator } from './fileNameCreator';
import { DisplayInfo } from '../displayInfo';
import { PictureNumber } from '../pictureNumber';

describe('create', () => {
  const nameMio = SampleData.mioName();
  const nameMei = SampleData.meiName();
  const fileNameCreator = new FileNameCreator();
  const displayInfoList = createDisplayInfoList();

  it('指定したレスラーのアルバムを取得すること', () => {
    const fileNames = fileNameCreator.creates(displayInfoList);
    expect(fileNames.length).toEqual(4);
  });

  it('ファイル名が他に関連している選手の名前にもなっていること', () => {
    const fileNames = fileNameCreator.creates(displayInfoList);
    const expected = `${nameMio.full}_${nameMei.full}_20200101_10`;
    const actual = fileNames[0]!;

    expect(actual.name).toEqual(expected);
  });

  it('同じレスラーで同じ日付の場合はファイル名がユニークになっていること', () => {
    const expected = `${nameMio.full}_2020_01_01_10_11`;
    const fileNames = fileNameCreator.creates(displayInfoList);
    const fileName = fileNames[2]!;
    expect(fileName.name).not.toEqual(expected);
  });

  function createDisplayInfoList(): TPictureDisplayInfo[] {
    const pictures: DisplayInfo[] = [
      createDisplayInfo(1, [SampleData.mioName(), SampleData.meiName()]),
      createDisplayInfo(2, [SampleData.mioName()]),
      createDisplayInfo(3, [SampleData.mioName()]),
      createDisplayInfo(4, [SampleData.mioName()]),
    ];

    return pictures;
  }

  function createDisplayInfo(num: number, wrestlerNames: TWrestlerName[]): TPictureDisplayInfo {
    const date = new Date('2020/01/01 10:11:00');
    const number = PictureNumber.build(num);
    const contributor: TPictureContributor = {
      number: faker.datatype.number(),
      identificationName: faker.name.firstName(),
      displayName: faker.name.findName(),
    };
    return new DisplayInfo(number, contributor, date, wrestlerNames);
  }
});

export {};
