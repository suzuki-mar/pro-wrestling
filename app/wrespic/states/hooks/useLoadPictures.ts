import fetchSources from '../queries/fetchSources';
import { useQuery } from 'blitz';
import { ISelectedWrestlers, IAlbumCollection } from '../..';
import { JSONConvert } from 'app/wrespic/states/jsonConvert';

export function useLoadPictures(
  selectedWrestlers: ISelectedWrestlers,
  albumCollection: IAlbumCollection
): IAlbumCollection {
  const [pictureURLParamList] = useQuery(fetchSources, selectedWrestlers);

  const sources = JSONConvert.toSources(pictureURLParamList);

  albumCollection.buildFromSources(sources);

  return albumCollection;
}

export function useLoadPicturesMock(
  selectedWrestlers: ISelectedWrestlers,
  albumCollection: IAlbumCollection
): IAlbumCollection {
  // const sources = JSONConvert.toSources(pictureURLParamList);

  // albumCollection.setUpFromPictures(sources);

  return albumCollection;
}
