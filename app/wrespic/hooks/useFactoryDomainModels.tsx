import fetchAlbumCollection from './queries/fetchAlbumCollection';
import { useQuery } from 'blitz';
import { ISelectedWrestlers, IAlbumCollection } from '..';
import { IWrestlerCollection } from 'app/core/wreslter/';
import fetchWrestlerCollection from './queries/fetchWrestlerCollection';
import { AlbumSerializer } from '../albumSerializer';
import { WrestlerSerializer } from 'app/core/wreslter/wrestlerSerializer';
import { SelectedWrestlers } from '../models/selectedWrestlers';

export function useFactoryDomainModels(): [
  IWrestlerCollection,
  ISelectedWrestlers,
  IAlbumCollection
] {
  const [wrelserCollectionParam] = useQuery(fetchWrestlerCollection, undefined);

  const wrestlerCollection = WrestlerSerializer.toWrestlerCollection(wrelserCollectionParam);
  const wrestlerNames = wrestlerCollection.wrestlers().map((wrestler) => wrestler.name);

  const [albumCollectionParam] = useQuery(fetchAlbumCollection, wrestlerNames as []);

  const albumCollection = AlbumSerializer.toAlbumCollection(albumCollectionParam, wrestlerNames);
  const selectedWrestlers = new SelectedWrestlers();

  return [wrestlerCollection, selectedWrestlers, albumCollection];
}
