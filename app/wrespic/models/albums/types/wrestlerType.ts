import { TWrestlerName } from 'app/core/wreslter';
import { TPicture, AlbumKind, AlbumKinds } from 'app/wrespic/';
import { IAlbumType } from './interface';

export class WrestlerType implements IAlbumType {
  constructor(private readonly _wrestlerName: TWrestlerName) {}

  title(): string {
    return this._wrestlerName.full;
  }

  filterToPictures(pictures: TPicture[]): TPicture[] {
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
