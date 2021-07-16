import fetchFavoriteWrestlerParams from './queries/fetchFavoriteWrestlerParams';
import fetchSources from './queries/fetchSources';
import { useQuery } from 'blitz';
import { ISelectedWrestlers, IAlbumCollection, IFavoriteWrestlers } from '..';
import { ValueObjectConvert } from 'app/wrespic/hooks/valueObjectConvert';
import { DomainModelFactory } from '../domainModelFactory';

export function useFactoryDomainModels(): [
  IFavoriteWrestlers,
  ISelectedWrestlers,
  IAlbumCollection
] {
  const [favoriteWrestlers, selectedWrestlers, albumCollection] = DomainModelFactory.createModels();

  const [_wrelsersParamsList] = useQuery(fetchFavoriteWrestlerParams, null);

  const wrelsersParamsList = _wrelsersParamsList.map((params) => {
    return { name: ValueObjectConvert.toWreslerName(params.name), id: params.id };
  });

  favoriteWrestlers.rebuild(wrelsersParamsList);
  favoriteWrestlers.sortById();

  const [sourcesParamList] = useQuery(fetchSources, wrelsersParamsList);
  const sources = sourcesParamList.map((params) => ValueObjectConvert.toSource(params));
  selectedWrestlers.rebuild([], sources);
  albumCollection.buildFromSources(sources);

  return [favoriteWrestlers, selectedWrestlers, albumCollection];
}
