import { IAlbumCollection, ISelectedWrestlers } from '.';

import { AlbumCollection } from './models/albums/albmuCollection';
import { IWrestlerCollection } from 'app/core/wreslter/';
import { WrestlerCollection } from 'app/core/wreslter/wrestlerCollection';
import { SelectedWrestlers } from './models/selectedWrestlers';

export class DomainModelFactory {
  static createModels(): [IWrestlerCollection, ISelectedWrestlers, IAlbumCollection] {
    return [new WrestlerCollection(), new SelectedWrestlers(), new AlbumCollection()];
  }
}
