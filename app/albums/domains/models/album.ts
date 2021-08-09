import { IPicture, IAlbum } from 'app/albums';
import { TWrestlerName } from 'app/wreslters';
import { IAlbumType } from './types/interface';
import { PromoterType } from './types/promoterType';
import { WrestlerType } from './types/wrestlerType';

export class Album implements IAlbum {
  static readonly MAX_COUNT: number = 100;

  constructor(readonly _type: IAlbumType, private _pictures: IPicture[]) {
    this._pictures = _type.filterToPictures(_pictures);

    if (this._pictures.length > Album.MAX_COUNT) {
      this._pictures = this._pictures.splice(0, Album.MAX_COUNT);
    }
  }

  pictures(): IPicture[] {
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

  static createsWrestlerAlbums(names: TWrestlerName[], pictures: IPicture[]): IAlbum[] {
    return names.map((name) => {
      const type = new WrestlerType(name);
      return new Album(type, pictures);
    });
  }
}
