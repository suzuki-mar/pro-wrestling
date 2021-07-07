import { IWrestlerName } from 'app/core/wreslter';
import { TPicture, IAlbum } from 'app/wrespic';

export class Album implements IAlbum {
  constructor(private _pictures: TPicture[], readonly wrestlerName: IWrestlerName) {}

  pictures(): TPicture[] {
    return this._pictures;
  }

  count(): number {
    return this._pictures.length;
  }
}
