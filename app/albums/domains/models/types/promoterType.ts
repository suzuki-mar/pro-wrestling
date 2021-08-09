import { IPromoter, TWrestlerName } from 'app/wreslters';
import { IPicture, AlbumKind, AlbumKinds } from 'app/albums';
import * as _ from 'loadsh';
import { IAlbumType } from './interface';

export class PromoterType implements IAlbumType {
  constructor(private readonly _promoter: IPromoter) {}

  title(): string {
    return this._promoter.name.shortName;
  }

  filterToPictures(pictures: IPicture[]): IPicture[] {
    const relatedPictures = pictures.filter((picture) => {
      const names = picture.displayInfo().wrestlerNames as TWrestlerName[];
      return names.some((name) => {
        return this._promoter.isBelongTo(name);
      });
    });

    const sortFunction = (picture: IPicture) => {
      return picture.displayInfo().date;
    };

    return _.sortBy(relatedPictures, sortFunction).reverse();
  }

  kind(): AlbumKind {
    return AlbumKinds.Promoter;
  }
}
