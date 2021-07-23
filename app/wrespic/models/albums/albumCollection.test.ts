import { AlbumCollection } from 'app/wrespic/models/albums/albumCollection';
import { SampleData } from 'sampleData';
import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import { ClientFactory } from 'infrastructure/clientFactory';

describe('AlbumCollection', () => {
  let collection: AlbumCollection;

  describe('filterAlbumsByWrestlerNames', () => {
    it('指定したレスラーだけ表示する', () => {
      const wreslerNames = SampleData.wrestlerNames();
      let collection = SampleData.albumCollection(wreslerNames);
      collection.filterAlbumsByWrestlerNames([wreslerNames[0]!]);

      expect(collection.currentSelectedAlbums().length).toEqual(1);
    });
  });

  describe('load', () => {
    beforeEach(() => {
      collection = new AlbumCollection();
    });

    it('指定したレスラーのアルバムを取得すること', async () => {
      await collection.load([SampleData.mioName(), SampleData.meiName()]);
      const album = collection.albums()[0]!;

      expect(album.wrestlerName.equal(SampleData.mioName())).toBeTruthy();
    });

    it('レスラーごとにアルバムに写真をセットしていること', async () => {
      await collection.load([SampleData.mioName(), SampleData.meiName()]);
      const existsEmptyAlbum = collection.albums().some((album) => album.pictures().length === 0);
      expect(existsEmptyAlbum).toBeFalsy();
    });
  });

  describe('実際のAPIにつなげる処理 必要になるとき以外Skipするs', () => {
    beforeEach(() => {
      RepositoryFactory.connectingToRealDB();
      ClientFactory.connectingToExternalAPI();
    });

    afterEach(() => {
      ClientFactory.resetStatus();
      RepositoryFactory.resetStatus();
    });

    it('コレクションをレスラー名順にロードできていること', async () => {
      collection = new AlbumCollection();
      const names = SampleData.wrestlerNames();
      await collection.load(names);

      const albums = collection.albums();

      const firstPictureWrestlerName = albums[0]!.wrestlerName!;
      expect(firstPictureWrestlerName.equal(names[0])).toBeTruthy();

      const lastIndex = albums.length - 1;
      const lastPictureWrestlerName = albums[lastIndex]!.wrestlerName;
      expect(lastPictureWrestlerName.equal(names[names.length - 1])).toBeTruthy();
    });
  });
});

export {};
