import { TWrestlerName } from 'app/core/wreslter';
import { TPicture, IAlbum } from 'app/wrespic';

export class Album implements IAlbum {
  constructor(private _pictures: TPicture[], readonly wrestlerName: TWrestlerName) {}

  pictures(): TPicture[] {
    return this._pictures;
  }

  count(): number {
    return this._pictures.length;
  }
}
