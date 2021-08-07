import { TWrestlerName } from 'app/wreslters';
import { IAlbumCollection } from 'app/albums';
import { AlbumCollection } from 'app/albums/domains/models/albumCollection';
import { WrestlerSerializer } from 'app/wreslters/wrestlerSerializer';

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
