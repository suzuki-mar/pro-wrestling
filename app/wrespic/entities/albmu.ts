import { IAlbum, TPicture, TWrestlerPictureURL } from 'app/wrespic';
import * as _ from 'loadsh';

export class Album implements IAlbum {
  private _pictures: TPicture[] = [];

  setUpPictures(pictureURLs: TWrestlerPictureURL[]): void {
    let pictureList = {};
    _.each(pictureURLs, (pu) => {
      pictureList[pu.urlStr] = { urlStr: pu.urlStr, wrestlerNames: [], file: undefined };
    });

    _.each(pictureList, (picture, urlStr) => {
      _.each(pictureURLs, (pictureUrl) => {
        if (urlStr === pictureUrl.urlStr) {
          picture['wrestlerNames'].push(pictureUrl.name);
        }
      });
    });

    this._pictures = _.map(pictureList, (photo, _) => {
      return photo;
    });
  }

  async prepareDownload(): Promise<void> {}

  pictures(): TPicture[] {
    return this._pictures;
  }
}
