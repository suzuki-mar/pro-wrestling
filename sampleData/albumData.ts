import { TWrestlerName } from 'app/wreslters';
import { IAlbum, IAlbumCollection, IPicture, TPictureDisplayInfo } from 'app/albums';
import { Picture } from 'app/albums/domains/models/pictures/picture';
import { SampleData } from 'sampleData';
import { PictureURLStr } from './pictureURLStr';
import faker from 'faker';
import { AlbumCollection } from 'app/albums/domains/models/albumCollection';
import { DisplayInfo } from 'app/albums/domains/models/pictures/displayInfo';
import { FileName } from 'app/albums/domains/models/pictures/fileName';
import { PictureNumber } from 'app/albums/domains/models/pictures/pictureNumber';
import * as _ from 'loadsh';
import { PictureURL } from 'app/albums/domains/models/pictures/pictureURL';
import { WrestlerType } from 'app/albums/domains/models/types/wrestlerType';
import { Album } from 'app/albums/domains/models/album';
import { Priority } from 'app/albums/domains/models/pictures/priorty';

export class AlbumData {
  static picture(wreslterName?: TWrestlerName, url?: string): IPicture {
    if (wreslterName === undefined) {
      wreslterName = SampleData.wrestlerName();
    }
    if (url === undefined) {
      url = faker.image.imageUrl() + faker.random.alphaNumeric(1000);
    }

    const displayInfo = this.displayInfo(wreslterName);
    const fileName = FileName.buildFromDisplayInfo(displayInfo);

    const pictureURL = PictureURL.build(url, `${url}:thumb`, `${url}:small`, displayInfo.number);

    const priorty = Priority.buildFromType(displayInfo.number, 'default');

    return Picture.build(displayInfo, fileName, pictureURL, [wreslterName], priorty);
  }

  static pictures(wreslterName: TWrestlerName): IPicture[] {
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
    let pictures: IPicture[] = [];
    wreslterNames.forEach((name) => {
      pictures = pictures.concat(this.pictures(name));
    });

    return AlbumCollection.rebuild(wreslterNames, pictures);
  }
}
