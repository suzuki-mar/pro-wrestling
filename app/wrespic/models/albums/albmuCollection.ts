import { IAlbum, IAlbumCollection, TSource } from 'app/wrespic';
import { TWrestlerName } from 'app/core/wreslter';
import { AlbumBuilder } from './albumFactory';

export class AlbumCollection implements IAlbumCollection {
  private _albums: IAlbum[];
  private _currentDisplayAlbum: IAlbum | undefined;

  constructor() {
    this._albums = [];
    this._currentDisplayAlbum = undefined;
  }

  buildFromSources(sources: TSource[]): void {
    const builder = new AlbumBuilder(sources);
    this._albums = builder.create();
    this._currentDisplayAlbum = this._albums[0]!;
  }

  albumNames(): string[] {
    return this._albums.map((album) => {
      return album.wrestlerName.full;
    });
  }

  async prepareDownload(): Promise<void> {}

  albums(): IAlbum[] {
    return this._albums;
  }

  changeCurrentDisplayAlbum(name: TWrestlerName): void {
    const album = this.findByWrestlerName(name);
    this._currentDisplayAlbum = album!;
  }

  currentDisplayAlbum(): IAlbum {
    return this._currentDisplayAlbum!;
  }

  findByWrestlerName(name: TWrestlerName): IAlbum | undefined {
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
