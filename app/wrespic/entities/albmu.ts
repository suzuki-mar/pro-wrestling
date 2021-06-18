import { IAlbum, IPhoto, TWrestlerPictureURL } from 'app/wrespic/components/interface';
import * as _ from 'loadsh';

export class Album implements IAlbum {
  private _isAllDownloadComplete = false;
  private _downloadedPhotos: IPhoto[] = [];

  async searchPhotos(photoURLs: TWrestlerPictureURL[]): Promise<IPhoto[]> {
    this._isAllDownloadComplete = true;

    return _.map(photoURLs, (url: TWrestlerPictureURL) => {
      return new Photo(url);
    });
  }

  isAllDownloadComplete(): boolean {
    return this._isAllDownloadComplete;
  }

  downloadedPhotos(): IPhoto[] {
    return this._downloadedPhotos;
  }
}

class Photo implements IPhoto {
  // Fileだと実装が大変なため一旦Stringｓにしている
  readonly file: string;
  constructor(readonly pictureURL: TWrestlerPictureURL) {}

  fixFileName() {}
}
