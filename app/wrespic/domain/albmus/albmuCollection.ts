import { IAlbum, IAlbumCollection, TSource } from 'app/wrespic';
import { IWrestlerName } from 'app/core/wreslter';
import { AlbumFactory } from './albumFactory';

export class AlbumCollection implements IAlbumCollection {
  private _albums: IAlbum[];

  setUpFromPictures(pictureURLs: TSource[]): void {
    const factory = new AlbumFactory(pictureURLs);
    this._albums = factory.create();
  }

  async prepareDownload(): Promise<void> {}

  albums(): IAlbum[] {
    return this._albums;
  }

  findByWrestlerName(name: IWrestlerName): IAlbum | undefined {
    const album = this._albums.find((album) => {
      return name.equal(album.wrestlerName);
    });

    if (album !== undefined) {
      return album;
    } else {
      return undefined;
    }
  }
}
