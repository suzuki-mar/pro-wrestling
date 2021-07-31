import { TWrestlerName } from 'app/core/wreslter';
import { IAlbum, IAlbumCollection, TPicture, TPictureDisplayInfo } from 'app/wrespic';
import { Picture } from 'app/wrespic/models/albums/pictures/picture';
import { SampleData } from 'sampleData';
import { PictureURLStr } from './pictureURLStr';
import faker from 'faker';
import { AlbumCollection } from 'app/wrespic/models/albums/albumCollection';
import { DisplayInfo } from 'app/wrespic/models/albums/pictures/displayInfo';
import { FileName } from 'app/wrespic/models/albums/pictures/fileName';
import { PictureNumber } from 'app/wrespic/models/albums/pictures/pictureNumber';
import * as _ from 'loadsh';
import { PictureURL } from 'app/wrespic/models/albums/pictures/pictureURL';
import { WrestlerType } from 'app/wrespic/models/albums/types/wrestlerType';
import { Album } from 'app/wrespic/models/albums/album';

export class AlbumData {
  static picture(wreslterName?: TWrestlerName, url?: string): TPicture {
    if (wreslterName === undefined) {
      wreslterName = SampleData.wrestlerName();
    }
    if (url === undefined) {
      url = faker.image.imageUrl() + faker.random.alphaNumeric(1000);
    }

    const displayInfo = this.displayInfo(wreslterName);
    const fileName = FileName.buildFromDisplayInfo(displayInfo);

    const pictureURL = PictureURL.build(url, `${url}:thumb`, `${url}:small`, displayInfo.number);
    return Picture.build(displayInfo, fileName, pictureURL);
  }

  static pictures(wreslterName: TWrestlerName): TPicture[] {
    const urls = PictureURLStr.mei();

    return urls.map((url) => {
      return this.picture(wreslterName, url);
    });
  }

  static displayInfoList(): TPictureDisplayInfo[] {
    const wreslterNames = SampleData.wrestlerNames();

    let displayInfoList: TPictureDisplayInfo[] = [];
    wreslterNames.forEach((name) => {
      displayInfoList = [...displayInfoList, this.displayInfo(name)];
    });

    return displayInfoList;
  }

  static displayInfo(name: TWrestlerName): DisplayInfo {
    const number = PictureNumber.build(_.random(1000));

    let contributor = {
      number: faker.datatype.number(10000),
      identificationName: faker.name.firstName() + '_identification',
      displayName: faker.name.firstName() + '_displayName',
    };

    return new DisplayInfo(number, contributor, new Date(), [name]);
  }

  static album(wreslterName: TWrestlerName): IAlbum {
    const pictures = this.pictures(wreslterName);
    const type = new WrestlerType(wreslterName);
    return new Album(type, pictures);
  }

  static albumCollection(wreslterNames: TWrestlerName[]): IAlbumCollection {
    let pictures: TPicture[] = [];
    wreslterNames.forEach((name) => {
      pictures = pictures.concat(this.pictures(name));
    });

    return AlbumCollection.rebuild(wreslterNames, pictures);
  }
}
