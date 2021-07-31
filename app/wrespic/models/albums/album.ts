import { TPicture, IAlbum } from 'app/wrespic';
import { IAlbumType } from './types/interface';
import { PromoterType } from './types/promoterType';
import { WrestlerType } from './types/wrestlerType';

export class Album implements IAlbum {
  constructor(readonly _type: IAlbumType, private _pictures: TPicture[]) {
    this._pictures = _type.filterToPictures(_pictures);
  }

  pictures(): TPicture[] {
    return this._pictures;
  }

  title(): string {
    return this._type.title();
  }

  count(): number {
    return this._pictures.length;
  }

  isDisplayable(): boolean {
    return this.count() > 0;
  }

  type(): WrestlerType | PromoterType | undefined {
    if (this._type instanceof WrestlerType) {
      return this._type;
    }

    if (this._type instanceof PromoterType) {
      return this._type;
    }

    if (this._type === undefined) {
      throw new Error('未知のType');
    }

    return undefined;
  }
}
