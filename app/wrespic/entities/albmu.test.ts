import { FavoriteWrestlers } from 'app/wrespic/entities/favoriteWrestlers';
import { Album } from 'app/wrespic/entities/albmu';
import { TWrestlerPictureURL } from 'app/wrespic';
import { SampleData } from 'db/sampleData';

describe('IAlbum', () => {
  const album = new Album();
  const favoriteWrestlers = new FavoriteWrestlers();
  const url: TWrestlerPictureURL = SampleData.wrestlerPictureURL();
  beforeEach(async () => {
    await favoriteWrestlers.load();
  });

  describe('searchPhotos', () => {
    it('検索したファイルを取得していること', async () => {
      await album.searchPhotos([url]);
      expect(album.photos().length).toEqual(1);
    });
  });

  describe('downloads', () => {
    beforeEach(async () => {
      await album.searchPhotos([url]);
    });

    it('完了状態になっていること', async () => {
      const url: TWrestlerPictureURL = SampleData.wrestlerPictureURL();

      await album.searchPhotos([url]);
      await album.downloadPhotos();
      expect(album.isAllDownloadComplete()).toEqual(true);
    });

    it('ファイルをダウンロードしていること', async () => {
      await album.downloadPhotos();
      expect(album.photos()[0]?.file()).toBeInstanceOf(File);
    });
  });
});

export {};
