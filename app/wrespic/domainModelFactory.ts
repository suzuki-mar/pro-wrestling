import { IAlbumCollection, IFavoriteWrestlers, ISelectedWrestlers } from '.';
import { AlbumCollection } from './models/albums/albmuCollection';
import { FavoriteWrestlers } from './models/favoriteWrestlers';
import { SelectedWrestlers } from './models/selectedWrestlers';

export class DomainModelFactory {
  static createModels(): [IFavoriteWrestlers, ISelectedWrestlers, IAlbumCollection] {
    return [new FavoriteWrestlers(), new SelectedWrestlers(), new AlbumCollection()];
  }
}
