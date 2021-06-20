import { IAlbum, TPicture, TWrestlerPictureURL } from 'app/wrespic';
import { PictureListCreator } from './albmus/pictureListCreator';

export class Album implements IAlbum {
  private _pictures: TPicture[] = [];

  setUpPictures(pictureURLs: TWrestlerPictureURL[]): void {
    const pictureListCreator = new PictureListCreator(pictureURLs);
    this._pictures = pictureListCreator.create();
  }

  async prepareDownload(): Promise<void> {}

  pictures(): TPicture[] {
    return this._pictures;
  }
}
