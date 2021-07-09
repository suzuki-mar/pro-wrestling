import { FavoriteWrestlers } from 'app/wrespic/domain/favoriteWrestlers';
import { AlbumCollection } from 'app/wrespic/domain/albmus/albmuCollection';
import { TSource } from 'app/wrespic';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import faker from 'faker';

describe('Album', () => {
  const collection = new AlbumCollection();
  const favoriteWrestlers = new FavoriteWrestlers();

  let urls: TSource[];
  const nameMio = new WrestlerName('桃野美桜');
  const nameMei = new WrestlerName('星月芽依');

  beforeEach(() => {
    const image = createImageURLStr(1);

    const date = new Date('2020/01/01 10:11:00');
    urls = [
      { name: nameMio, urlStr: image, date: date },
      { name: nameMei, urlStr: image, date: date },
      { name: nameMio, urlStr: createImageURLStr(2), date: new Date('2020/01/01 10:11:00') },
      { name: nameMio, urlStr: createImageURLStr(3), date: new Date('2020/01/01 10:11:00') },
      { name: nameMio, urlStr: createImageURLStr(4), date: new Date('2020/01/01 10:11:00') },
    ];
  });

  beforeEach(async () => {
    await favoriteWrestlers.load();
  });

  describe('build', () => {
    beforeEach(() => {
      collection.setUpFromPictures(urls);
    });

    it('指定したレスラーのアルバムを取得すること', () => {
      expect(collection.findByWrestlerName(nameMio)!.count()).toEqual(4);
    });

    it('ファイル名が他に関連している選手の名前になっていること', () => {
      const expected = `${nameMio.full}_${nameMei.full}_2020_01_01_10_11`;
      const actual = collection.findByWrestlerName(nameMei)?.pictures()[0]!.fileName;

      expect(expected).toEqual(actual);
    });

    it('同じレスラーで同じ日付の場合はファイル名がユニークになっていること', () => {
      const expected = `${nameMio.full}_2020_01_01_10_11`;

      const picture = collection.findByWrestlerName(nameMio)!.pictures()[2];
      expect(picture!.fileName).not.toEqual(expected);
    });
  });

  describe.skip('prepareDownload APIの実装が必要なため未実装', () => {
    it('ダウンロードするファイルを作成していること', async () => {});
  });
});

function createImageURLStr(key: number): string {
  return faker.image.imageUrl(faker.datatype.number(10000)) + `_${key.toString()}`;
}

export {};
