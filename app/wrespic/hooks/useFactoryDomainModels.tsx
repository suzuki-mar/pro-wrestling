import fetchWrestlerParams from './queries/fetchWrestlerParams';
import fetchSources from './queries/fetchSources';
import { useQuery } from 'blitz';
import { ISelectedWrestlers, IAlbumCollection } from '..';
import { ValueObjectConvert } from 'app/wrespic/hooks/valueObjectConvert';
import { DomainModelFactory } from '../domainModelFactory';
import { IWrestlerCollection } from 'app/core/wreslter/';

export function useFactoryDomainModels(): [
  IWrestlerCollection,
  ISelectedWrestlers,
  IAlbumCollection
] {
  const [wrestlerCollection, selectedWrestlers, albumCollection] =
    DomainModelFactory.createModels();

  const [_wrelsersParamsList] = useQuery(fetchWrestlerParams, null);

  const wrelsersParamsList = _wrelsersParamsList.map((params) => {
    return { name: ValueObjectConvert.toWreslerName(params.name), id: params.id };
  });

  wrestlerCollection.rebuild(wrelsersParamsList);
  wrestlerCollection.sortById();

  const [sourcesParamList] = useQuery(fetchSources, wrelsersParamsList);
  const sources = sourcesParamList.map((params) => ValueObjectConvert.toSource(params));
  selectedWrestlers.rebuild([], sources);
  albumCollection.buildFromSources(sources);

  return [wrestlerCollection, selectedWrestlers, albumCollection];
}
