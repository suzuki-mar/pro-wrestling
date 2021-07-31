import { AlbumCollection } from 'app/wrespic/models/albums/albumCollection';
import { SampleData } from 'sampleData';
import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import { ClientFactory } from 'infrastructure/clientFactory';
import { AlbumKinds } from 'app/wrespic';
import { WrestlerType } from './types/wrestlerType';
import * as _ from 'loadsh';

describe('AlbumCollection', () => {
  let collection: AlbumCollection;

  describe('filterAlbumsByWrestlerNames', () => {
    it('指定したレスラーと団体のアルバムだけ表示する', () => {
      const wreslerNames = SampleData.wrestlerNames();
      let collection = SampleData.albumCollection(wreslerNames);
      collection.filterAlbumsByWrestlerNames([wreslerNames[0]!]);

      expect(collection.currentSelectedAlbums().length).toEqual(2);
    });
  });

  describe('load', () => {
    beforeEach(() => {
      collection = new AlbumCollection();
    });

    it('指定したレスラーのアルバムを取得すること', async () => {
      await collection.load([SampleData.mioName(), SampleData.meiName()]);
      const album = collection.allAlbums()[0]!;

      const type = album.type() as WrestlerType;
      expect(type.wrestlerName().equal(SampleData.mioName())).toBeTruthy();
    });

    it('レスラーごとにアルバムに写真をセットしていること', async () => {
      await collection.load([SampleData.mioName(), SampleData.meiName()]);
      const existsEmptyAlbum = collection
        .allAlbums()
        .some((album) => album.pictures().length === 0);
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

      const albums = collection.albumsFromKind(AlbumKinds.Wrestler);
      const firstType = albums[0]!.type() as WrestlerType;
      expect(firstType.wrestlerName().equal(names[0])).toBeTruthy();

      const lastType = _.last(albums).type() as WrestlerType;
      expect(lastType.wrestlerName().equal(names[names.length - 1])).toBeTruthy();
    });
  });
});

export {};
