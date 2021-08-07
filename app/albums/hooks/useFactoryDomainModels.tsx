import fetchAlbumCollection from './queries/fetchAlbumCollection';
import { useQuery } from 'blitz';
import { IAlbumCollection } from '..';
import { IWrestlerCollection, ISelectedWrestlers } from 'app/wreslters';
import fetchWrestlerCollection from 'app/wreslters/hooks/queries/fetchWrestlerCollection';
import { AlbumSerializer } from '../albumSerializer';
import { WrestlerSerializer } from 'app/wreslters/wrestlerSerializer';
import { SelectedWrestlers } from 'app/wreslters/domains/models/selectedWrestlers';

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
