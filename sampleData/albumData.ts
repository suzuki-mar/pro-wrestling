import { TWrestlerName } from 'app/core/wreslter';
import { IAlbum, IAlbumCollection, TPicture, TPictureDisplayInfo } from 'app/wrespic';
import { Picture } from 'app/wrespic/models/albums/pictures/picture';
import { SampleData } from 'sampleData';
import { PictureURLStr } from './pictureURLStr';
import faker from 'faker';
import { AlbumCollection } from 'app/wrespic/models/albums/albumCollection';
import { Album } from 'app/wrespic/models/albums/album';
import { DisplayInfo } from 'app/wrespic/models/albums/pictures/displayInfo';
import { FileName } from 'app/wrespic/models/albums/pictures/fileName';
import { PictureNumber } from 'app/wrespic/models/albums/pictures/pictureNumber';
import * as _ from 'loadsh';
import { PictureURL } from 'app/wrespic/models/albums/pictures/pictureURL';

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
    return new DisplayInfo(number, faker.name.firstName(), new Date(), [name]);
  }

  static album(wreslterName: TWrestlerName): IAlbum {
    const pictures = this.pictures(wreslterName);
    return Album.buildForWrestler(wreslterName, pictures);
  }

  static albumCollection(wreslterNames: TWrestlerName[]): IAlbumCollection {
    let pictures: TPicture[] = [];
    wreslterNames.forEach((name) => {
      pictures = pictures.concat(this.pictures(name));
    });

    return AlbumCollection.rebuild(wreslterNames, pictures);
  }
}
