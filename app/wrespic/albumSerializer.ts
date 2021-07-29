import { TWrestlerName } from 'app/core/wreslter';
import { WrestlerSerializer } from 'app/core/wreslter/wrestlerSerializer';
import { IAlbumCollection, TPicture, TPictureDisplayInfo, TPictureFileName, TPictureURL } from '.';
import { AlbumCollection } from './models/albums/albumCollection';
import { DisplayInfo } from './models/albums/pictures/displayInfo';
import { FileName } from './models/albums/pictures/fileName';
import { Picture } from './models/albums/pictures/picture';
import { PictureNumber } from './models/albums/pictures/pictureNumber';
import { PictureURL } from './models/albums/pictures/pictureURL';

export class AlbumSerializer {
  static toAlbumCollection(params: {}, wrestlerNames: TWrestlerName[]): IAlbumCollection {
    let pictures: TPicture[] = [];
    params['_albums'].forEach((params) => {
      const ps = params['_pictures'].map((param) => {
        const [displayInfo, fileName, url] = this.toPictureItems(param);
        return Picture.build(displayInfo, fileName, url);
      });

      pictures = pictures.concat(ps);
    });

    return AlbumCollection.rebuild(wrestlerNames, pictures);
  }

  private static toPictureItems(params: {}): [TPictureDisplayInfo, TPictureFileName, TPictureURL] {
    const displayInfoParam = params['displayInfo'];
    const wreslerNames = displayInfoParam['wrestlerNames'].map((nameParams) =>
      WrestlerSerializer.toWreslerName(nameParams)
    );

    const number = PictureNumber.build(displayInfoParam['number']['number']);
    const displayInfo = new DisplayInfo(
      number,
      displayInfoParam['contributor'],
      new Date(displayInfoParam['date']),
      wreslerNames
    );

    const urlParams = params['pictureURL'];
    const pictureURL = PictureURL.build(
      urlParams['originalURL'],
      urlParams['thumbnailURL'],
      urlParams['defaultSizeURL'],
      displayInfo.number
    );
    const fileName = FileName.rebuildFromFileNameStr(params['fileName']['name'], number);

    return [displayInfo, fileName, pictureURL];
  }
}
