import { IAlbum, IPhoto, TWrestlerPictureURL } from 'app/wrespic';
import * as _ from 'loadsh';
import { createFileFromURL } from 'infrastructure';

export class Album implements IAlbum {
  private _isAllDownloadComplete = false;
  private _photos: IPhoto[] = [];

  async searchPhotos(photoURLs: TWrestlerPictureURL[]): Promise<void> {
    this._photos = _.map(photoURLs, (photoURL: TWrestlerPictureURL) => {
      return new MockPhoto(photoURL);
    });
  }

  async downloadPhotos(): Promise<void> {
    const donwloadPromises = _.map(this._photos, (photo: IPhoto) => {
      return photo.downloadFile();
    });

    await Promise.all(donwloadPromises);
    this._isAllDownloadComplete = true;
  }

  photos() {
    return this._photos;
  }

  isAllDownloadComplete(): boolean {
    return this._isAllDownloadComplete;
  }
}

class MockPhoto implements IPhoto {
  private _file: File;
  constructor(readonly pictureURL: TWrestlerPictureURL) {}

  async downloadFile(): Promise<void> {
    this._file = await createFileFromURL(this.pictureURL.urlStr);
  }

  file(): File {
    return this._file;
  }

  fixFileName() {}
}
