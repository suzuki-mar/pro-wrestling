import { TWrestlerName } from 'app/core/wreslter';
import { IAlbumCollection } from 'app/wrespic';
import { AlbumCollection } from 'app/wrespic/models/albums/albumCollection';
import { WrestlerSerializer } from 'app/core/wreslter/wrestlerSerializer';

export default async function fetchAlbumCollection(
  // JSONとして渡ってくるため型定義を引数の段階ではなしない
  wrestlerNameParamList: []
): Promise<IAlbumCollection> {
  const wrestlerNames: TWrestlerName[] = wrestlerNameParamList.map((params) => {
    return WrestlerSerializer.toWreslerName(params);
  });

  const albumCollection = new AlbumCollection();
  await albumCollection.load(wrestlerNames);

  return albumCollection;
}
