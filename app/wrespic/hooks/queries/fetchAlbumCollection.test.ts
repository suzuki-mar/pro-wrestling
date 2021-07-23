import { AlbumCollection } from 'app/wrespic/models/albums/albumCollection';
import { SampleData } from 'sampleData';
import fetchAlbumCollection from './fetchAlbumCollection';

it('アルバムを取得すること', async () => {
  const jsonStr = JSON.stringify(SampleData.wrestlerNames());
  const json = JSON.parse(jsonStr);
  const albumCollection = await fetchAlbumCollection(json);
  expect(albumCollection).toBeInstanceOf(AlbumCollection);
});
