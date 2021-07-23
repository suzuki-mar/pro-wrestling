import { TWrestlerName } from 'app/core/wreslter';
import { TPicture, IAlbum } from 'app/wrespic';

export class Album implements IAlbum {
  static buildForWrestler(name: TWrestlerName, pictures: TPicture[]): IAlbum {
    pictures = pictures.filter((picture) => {
      return picture.isRelated(name);
    });

    return new Album(name, pictures);
  }

  pictures(): TPicture[] {
    return this._pictures;
  }

  count(): number {
    return this._pictures.length;
  }

  isDisplayable(): boolean {
    return this.count() > 0;
  }

  private constructor(readonly wrestlerName: TWrestlerName, private _pictures: TPicture[]) {}
}
