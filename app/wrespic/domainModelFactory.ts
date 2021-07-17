import { IAlbumCollection, ISelectedWrestlers, ISourceCollection } from '.';

import { AlbumCollection } from './models/albums/albmuCollection';
import { IWrestlerCollection } from 'app/core/wreslter/';
import { WrestlerCollection } from 'app/core/wreslter/wrestlerCollection';
import { SelectedWrestlers } from './models/selectedWrestlers';
import { SourceCollection } from './models/sourceCollection';

export class DomainModelFactory {
  static createModels(): [
    IWrestlerCollection,
    ISelectedWrestlers,
    IAlbumCollection,
    ISourceCollection
  ] {
    return [
      new WrestlerCollection(),
      new SelectedWrestlers(),
      new AlbumCollection(),
      new SourceCollection(),
    ];
  }
}
