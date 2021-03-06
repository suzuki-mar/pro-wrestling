import { TWrestlerName } from 'app/wreslters';
import { IPicture, AlbumKind, AlbumKinds } from 'app/albums';
import { IAlbumType } from './interface';

export class WrestlerType implements IAlbumType {
  constructor(private readonly _wrestlerName: TWrestlerName) {}

  title(): string {
    return this._wrestlerName.full;
  }

  filterToPictures(pictures: IPicture[]): IPicture[] {
    return pictures.filter((picture) => {
      return picture.isRelated(this.wrestlerName());
    });
  }

  kind(): AlbumKind {
    return AlbumKinds.Wrestler;
  }

  wrestlerName() {
    return this._wrestlerName;
  }
}
