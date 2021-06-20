import { FavoriteWrestlers } from 'app/wrespic/entities/favoriteWrestlers';
import { Album } from 'app/wrespic/entities/albmu';
import { TWrestlerPictureURL } from 'app/wrespic';
import { SampleData } from 'db/sampleData';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';

describe('IAlbum', () => {
  const album = new Album();
  const favoriteWrestlers = new FavoriteWrestlers();

  let urls: TWrestlerPictureURL[];
  const nameMio = new WrestlerName('桃野美桜');
  const nameMei = new WrestlerName('星月芽依');

  beforeEach(() => {
    const image1 = SampleData.imageURLStr();
    const image2 = SampleData.imageURLStr();

    urls = [
      { name: nameMio, urlStr: image1 },
      { name: nameMei, urlStr: image1 },
      { name: nameMio, urlStr: image2 },
    ];
  });

  beforeEach(async () => {
    await favoriteWrestlers.load();
  });

  describe('buildPictures', () => {
    it('Pictureを作成していること', async () => {
      album.setUpPictures(urls);
      expect(album.pictures()[0]!['wrestlerNames']).toEqual([nameMio, nameMei]);
    });
  });

  describe.skip('prepareDownload APIの実装が必要なため未実装', () => {
    it('ダウンロードするファイルを作成していること', async () => {});
  });
});

export {};
