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
  static picture(): TPicture {
    const displayInfo = this.displayInfo(SampleData.wrestlerName());
    const fileName = FileName.buildFromDisplayInfo(displayInfo);
    const pictureURL = PictureURL.build(faker.image.imageUrl(_.random(1000)), displayInfo.number);
    return Picture.build(displayInfo, fileName, pictureURL);
  }

  static pictures(wreslterName: TWrestlerName): TPicture[] {
    const urls = PictureURLStr.mei();

    return urls.map((url) => {
      const displayInfo = this.displayInfo(wreslterName);
      const fileName = FileName.buildFromDisplayInfo(displayInfo);
      const pictureURL = PictureURL.build(url, displayInfo.number);
      return Picture.build(displayInfo, fileName, pictureURL);
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

  static displayInfo(name: TWrestlerName): TPictureDisplayInfo {
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
