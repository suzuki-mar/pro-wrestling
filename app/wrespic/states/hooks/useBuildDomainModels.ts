import fetchFavoriteWrestlers from '../queries/fetchFavoriteWrestlers';
import { useQuery } from 'blitz';
import { SelectedWrestlers } from '../../domain/selectedWrestlers';
import { AlbumCollection } from '../../domain/albmus/albmuCollection';
import { ISelectedWrestlers, IAlbumCollection, IFavoriteWrestlers } from '../..';
import { SampleData } from 'sampleData';
import { JSONConvert } from 'app/wrespic/states/jsonConvert';

export function useBuildDomainModels(): [IFavoriteWrestlers, ISelectedWrestlers, IAlbumCollection] {
  const [wrelsersParams] = useQuery(fetchFavoriteWrestlers, null);

  const favoriteWrestlers = JSONConvert.toFavoriteWreslers(wrelsersParams);
  favoriteWrestlers.sortById();

  const albumCollection = new AlbumCollection();
  albumCollection.buildFromSources(SampleData.sources());

  return [favoriteWrestlers, new SelectedWrestlers(), albumCollection];
}
