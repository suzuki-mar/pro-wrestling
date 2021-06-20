import { FavoriteWrestlers } from 'app/wrespic/entities/favoriteWrestlers';
import { Album } from 'app/wrespic/entities/albmu';
import { TWrestlerPictureURL } from 'app/wrespic';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import faker from 'faker';

describe('IAlbum', () => {
  const album = new Album();
  const favoriteWrestlers = new FavoriteWrestlers();

  let urls: TWrestlerPictureURL[];
  const nameMio = new WrestlerName('桃野美桜');
  const nameMei = new WrestlerName('星月芽依');

  beforeEach(() => {
    const image = createImageURLStr();

    const date = new Date('2020/01/01 10:11:00');
    urls = [
      { name: nameMio, urlStr: image, date: date },
      { name: nameMei, urlStr: image, date: date },
      { name: nameMio, urlStr: createImageURLStr(), date: new Date('2020/01/01 10:11:00') },
      { name: nameMio, urlStr: createImageURLStr(), date: new Date('2020/01/01 10:11:00') },
      { name: nameMio, urlStr: createImageURLStr(), date: new Date('2020/01/01 10:11:00') },
    ];
  });

  beforeEach(async () => {
    await favoriteWrestlers.load();
  });

  describe('buildPictures', () => {
    beforeEach(() => {
      album.setUpPictures(urls);
    });

    it('一つのPictureのなかに関連付けられているように作成していること', async () => {
      expect(album.pictures()[0]!['wrestlerNames']).toEqual([nameMio, nameMei]);
    });

    it('写真の名前が作成されていること', async () => {
      const name = `${nameMio.full}_${nameMei.full}_2020_01_01_10_11`;
      expect(album.pictures()[0]!['fileName']).toEqual(name);
    });

    it('同じレスラーで同じ日付の場合は_(num)の形式一つのPictureのなかに関連付けられているように作成していること', async () => {
      const name = `${nameMio.full}_${nameMei.full}_2020_01_01_10_11`;
      expect(album.pictures()[1]!['fileName']).not.toEqual(name);
    });
  });

  describe.skip('prepareDownload APIの実装が必要なため未実装', () => {
    it('ダウンロードするファイルを作成していること', async () => {});
  });
});

function createImageURLStr(): string {
  return faker.image.imageUrl(faker.datatype.number(10000));
}

export {};
