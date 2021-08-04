import { SampleData } from 'sampleData';
import { DisplayInfo } from '../pictures/displayInfo';
import { Picture } from '../pictures/picture';
import { TPicture, TPictureDisplayInfo } from '../../..';
import * as _ from 'loadsh';
import { PromoterType } from './promoterType';
import { Album } from '../album';

describe('buildForLatestPromoter', () => {
  let pictures: TPicture[] = [];
  const dateStrs = [
    '2021-07-31T00:01:04.497Z',
    '2021-07-30T00:01:04.497Z',
    '2021-07-29T00:01:04.497Z',
  ];

  beforeEach(() => {
    const names = [SampleData.meiName(), SampleData.mioName()];
    names.forEach((name) => {
      const basePicture = SampleData.pictures(name)[0]!;
      pictures = pictures.concat(buidPicturesOfDateSpecified(basePicture, dateStrs));
    });

    const unrelatedPicture = SampleData.pictures(SampleData.unknownName())[0]!;
    pictures = [...pictures, unrelatedPicture];
  });

  it('最新順で取得する', () => {
    const promoter = SampleData.promoter();
    const type = new PromoterType(promoter);
    const album = new Album(type, pictures);

    const postDays = album.pictures().map((picture) => {
      return picture.postDay();
    });

    expect(postDays[0]).toEqual('2021-07-31');
    expect(_.last(postDays)).toEqual('2021-07-29');
  });
});

function buidPicturesOfDateSpecified(basePicture: TPicture, dateStrs: string[]): TPicture[] {
  let newPictures: TPicture[] = [];

  dateStrs.forEach((dateStr) => {
    const date = new Date(dateStr);

    let displayInfo = basePicture.displayInfo as TPictureDisplayInfo;
    let fileName = basePicture.fileName;
    let url = basePicture.pictureURL;

    displayInfo = new DisplayInfo(
      displayInfo.number,
      displayInfo.contributor,
      date,
      displayInfo.wrestlerNames
    );

    newPictures = [...newPictures, Picture.build(displayInfo, fileName, url)];
  });

  return newPictures;
}

export {};
