import { IAlbum, IAlbumCollection, TSource } from 'app/wrespic';
import { IWrestlerName } from 'app/core/wreslter';
import { AlbumFactory } from './albumFactory';

export class AlbumCollection implements IAlbumCollection {
  private _albums: IAlbum[];
  private _currentDisplayAlbum: IAlbum | undefined;

  constructor() {
    this._albums = [];
    this._currentDisplayAlbum = undefined;
  }

  buildFromSources(sources: TSource[]): void {
    const factory = new AlbumFactory(sources);
    this._albums = factory.create();
    this._currentDisplayAlbum = this._albums[0]!;
  }

  async prepareDownload(): Promise<void> {}

  albums(): IAlbum[] {
    return this._albums;
  }

  changeCurrentDisplayAlbum(name: IWrestlerName): void {
    const album = this.findByWrestlerName(name);
    this._currentDisplayAlbum = album!;
  }

  currentDisplayAlbum(): IAlbum {
    return this._currentDisplayAlbum!;
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
