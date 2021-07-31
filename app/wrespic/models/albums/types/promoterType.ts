import { IPromoter, TWrestlerName } from 'app/core/wreslter';
import { TPicture, AlbumKind, AlbumKinds } from 'app/wrespic/';
import * as _ from 'loadsh';
import { IAlbumType } from './interface';

export class PromoterType implements IAlbumType {
  constructor(private readonly _promoter: IPromoter) {}

  title(): string {
    return this._promoter.name.shortName;
  }

  filterToPictures(pictures: TPicture[]): TPicture[] {
    const relatedPictures = pictures.filter((picture) => {
      const names = picture.displayInfo.wrestlerNames as TWrestlerName[];
      return names.some((name) => {
        return this._promoter.isBelongTo(name);
      });
    });

    const sortFunction = (picture: TPicture) => {
      return picture.displayInfo.date;
    };

    return _.sortBy(relatedPictures, sortFunction).reverse();
  }

  kind(): AlbumKind {
    return AlbumKinds.Promoter;
  }
}
