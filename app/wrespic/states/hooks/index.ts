import getFavoriteWrestlers from '../queries/getFavoriteWrestlers';
import getPictureUrls from '../queries/getPictures';
import { useQuery } from 'blitz';
import { SelectedWrestlers } from '../../domain/selectedWrestlers';
import { AlbumCollection } from '../../domain/albmus/albmuCollection';
import { ISelectedWrestlers, IAlbumCollection, TSource } from '../..';
import { SampleData } from 'sampleData';
import { JSONConvert } from 'app/wrespic/states/jsonConvert';

export function useLoadFavoriteWrestlers() {
  const [wrelsersParams] = useQuery(getFavoriteWrestlers, null);

  const favoriteWrestlers = JSONConvert.toFavoriteWreslers(wrelsersParams);
  return favoriteWrestlers;
}

export function useSelectedWrestlers() {
  return new SelectedWrestlers();
}

export function useAlbmu() {
  const sources: TSource[] = [];
  SampleData.picturesOfMaria().forEach((picture) => {
    sources.push(picture);
  });

  SampleData.picturesOfMei().forEach((picture) => {
    sources.push(picture);
  });

  const albmu = new AlbumCollection();
  albmu.setUpFromPictures(sources);

  return albmu;
}

export function useLoadPictures(
  selectedWrestlers: ISelectedWrestlers,
  album: IAlbumCollection
): IAlbumCollection {
  const [pictureURLParamList] = useQuery(getPictureUrls, selectedWrestlers);

  const pictureURLs = JSONConvert.toSources(pictureURLParamList);

  album.setUpFromPictures(pictureURLs);
  return album;
}
