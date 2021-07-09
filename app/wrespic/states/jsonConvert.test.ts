import { JSONConvert } from 'app/wrespic/states/jsonConvert';
import { SampleData } from 'sampleData';
import { FavoriteWrestlers } from 'app/wrespic/domain/favoriteWrestlers';
import { SelectedWrestlers } from '../domain/selectedWrestlers';

describe('jsonConvert', () => {
  describe('toWreslerName', () => {
    it('JSONからインスタンスを作成すること', async () => {
      const name = SampleData.wrestlerName();
      const params = convertParams(name);

      const restoredName = JSONConvert.toWreslerName(params);
      expect(name.equal(restoredName)).toBeTruthy();
    });
  });

  describe('toFavoriteWreslers', () => {
    it('JSONからインスタンスを作成すること', async () => {
      const favorites = FavoriteWrestlers.build(SampleData.wrestlers());
      const params = convertParams(favorites);
      const restored = JSONConvert.toFavoriteWreslers(params);

      expect(favorites.names()[0]!.equal(restored.names()[0]!)).toBeTruthy();
    });
  });

  describe('toSelectedWresler', () => {
    const selectedWrestlers = new SelectedWrestlers();

    beforeEach(() => {
      const names = SampleData.wrestlerNames();

      names.forEach((name) => {
        selectedWrestlers.selectWreslerName(name);
      });
    });

    it('JSONからインスタンスを作成すること', async () => {
      const params = convertParams(selectedWrestlers);

      const restored = JSONConvert.toSelectedWresler(params);

      expect(selectedWrestlers.names()[0]!.equal(restored.names()[0]!)).toBeTruthy();
    });
  });

  describe('toPictureURLs', () => {
    it('JSONからインスタンスを作成すること', async () => {
      const pictureUrls = SampleData.picturesOfMei();
      const params = convertParams(pictureUrls);

      const restored = JSONConvert.toSources(params);
      expect(restored[0]!.urlStr).toEqual(pictureUrls[0]!.urlStr);
      expect(Date.parse(restored['date'])).not.toEqual(0);
    });
  });
});

function convertParams(instance: any): any {
  const json = JSON.stringify(instance);
  return JSON.parse(json);
}

export {};
