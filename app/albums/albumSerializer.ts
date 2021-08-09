import { TWrestlerName } from 'app/wreslters';
import { WrestlerName } from 'app/wreslters/domains/models/wrestlerName';
import {
  IAlbumCollection,
  IPicture,
  TPictureDisplayInfo,
  TPictureFileName,
  TPicturePriority,
  TPictureURL,
} from '.';
import { AlbumCollection } from './domains/models/albumCollection';
import { DisplayInfo } from './domains/models/pictures/displayInfo';
import { FileName } from './domains/models/pictures/fileName';
import { Picture } from './domains/models/pictures/picture';
import { PictureNumber } from './domains/models/pictures/pictureNumber';
import { PictureURL } from './domains/models/pictures/pictureURL';
import { Priority } from './domains/models/pictures/priorty';

export class AlbumSerializer {
  static toAlbumCollection(params: {}, wrestlerNames: TWrestlerName[]): IAlbumCollection {
    let pictures: IPicture[] = [];

    const albmuKeys = ['_wreslerAlbums', '_promoteAlbums'];

    albmuKeys.forEach((key) => {
      params[key].forEach((params) => {
        params['_pictures'].forEach((param) => {
          const [displayInfo, fileName, url, wrestlerNames, priorty] = this.toPictureItems(param);

          const picture = Picture.build(displayInfo, fileName, url, wrestlerNames, priorty);
          const alreadyExits = pictures.some((p) => {
            return picture.pictureURL().equal(p.pictureURL());
          });

          if (!alreadyExits) {
            pictures = [...pictures, picture];
          }
        });
      });
    });

    return AlbumCollection.rebuild(wrestlerNames, pictures);
  }

  private static toPictureItems(params: {}): [
    TPictureDisplayInfo,
    TPictureFileName,
    TPictureURL,
    TWrestlerName[],
    TPicturePriority
  ] {
    const displayInfoParam = params['_displayInfo'];

    const wrestlerNames = params['_wrestlerNames'].map((param) => {
      return new WrestlerName(param['full'], param['unique']);
    });

    const number = PictureNumber.build(displayInfoParam['number']['number']);
    const displayInfo = new DisplayInfo(
      number,
      displayInfoParam['contributor'],
      new Date(displayInfoParam['date']),
      wrestlerNames
    );

    const urlParams = params['_pictureURL'];
    const pictureURL = PictureURL.build(
      urlParams['originalURL'],
      urlParams['thumbnailURL'],
      urlParams['defaultSizeURL'],
      displayInfo.number
    );
    const fileName = FileName.rebuildFromFileNameStr(params['_fileName']['name'], number);

    const priority = Priority.buildFromValue(number, params['_priority']['baseValue']);

    return [displayInfo, fileName, pictureURL, wrestlerNames, priority];
  }
}
