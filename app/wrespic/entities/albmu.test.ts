import { FavoriteWrestlers } from 'app/wrespic/entities/favoriteWrestlers';
import { Album } from 'app/wrespic/entities/albmu';
import { TWrestlerPictureURL } from 'app/wrespic/components/interface';
import { SampleData } from 'db/sampleData';

describe('IAlbum', () => {
  describe('searchPhotos', () => {
    const album = new Album();
    const favoriteWrestlers = new FavoriteWrestlers();

    beforeAll(async () => {
      await favoriteWrestlers.load();
    });

    it('完了状態になっていること', async () => {
      const url: TWrestlerPictureURL = SampleData.wrestlerPictureURL();

      await album.searchPhotos([url]);
      expect(album.isAllDownloadComplete()).toEqual(true);
    });
  });
});

export {};
