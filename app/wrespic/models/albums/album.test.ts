import { WrestlerCollection } from 'app/core/wreslter/wrestlerCollection';
import { AlbumCollection } from 'app/wrespic/models/albums/albmuCollection';
import { TImageURL, TSource } from 'app/wrespic';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import faker from 'faker';
import { SampleData } from 'sampleData';

describe('Album', () => {
  const collection = new AlbumCollection();
  const wrestlerCollection = new WrestlerCollection();

  let urls: TSource[];
  const nameMio = SampleData.mioName();
  const nameMei = SampleData.meiName();

  beforeEach(async () => {
    await wrestlerCollection.load();

    const image = createImageURL(1);

    const date = new Date('2020/01/01 10:11:00');
    urls = [
      {
        name: SampleData.mioName(),
        imageURL: image,
        date: date,
        contributor: faker.name.firstName(),
      },
      {
        name: SampleData.meiName(),
        imageURL: image,
        date: date,
        contributor: faker.name.firstName(),
      },
      {
        name: SampleData.mioName(),
        imageURL: createImageURL(2),
        date: new Date('2020/01/01 10:11:00'),
        contributor: faker.name.firstName(),
      },
      {
        name: SampleData.mioName(),
        imageURL: createImageURL(3),
        date: new Date('2020/01/01 10:11:00'),
        contributor: faker.name.firstName(),
      },
      {
        name: SampleData.mioName(),
        imageURL: createImageURL(4),
        date: new Date('2020/01/01 10:11:00'),
        contributor: faker.name.firstName(),
      },
    ];
  });

  describe('build', () => {
    beforeEach(() => {
      collection.buildFromSources(urls);
    });

    it.skip('指定したレスラーのアルバムを取得すること', () => {
      expect(collection.findByWrestlerName(nameMio)!.count()).toEqual(4);
    });

    it('ファイル名が他に関連している選手の名前にもなっていること', () => {
      const expected = `${nameMio.full}_${nameMei.full}_20200101_10`;
      const pictures = collection.findByWrestlerName(nameMei)?.pictures()!;
      const actual = pictures[0]!.fileName;

      expect(expected).toEqual(actual);
    });

    it.skip('同じレスラーで同じ日付の場合はファイル名がユニークになっていること', () => {
      const expected = `${nameMio.full}_2020_01_01_10_11`;

      const picture = collection.findByWrestlerName(nameMio)!.pictures()[2];
      expect(picture!.fileName).not.toEqual(expected);
    });
  });

  describe.skip('changeCurrentDisplayAlbum', () => {
    beforeEach(() => {
      collection.buildFromSources(SampleData.sources());
    });

    it('表示するアルバムを選択する', () => {
      const targetName = SampleData.meiName();
      collection.changeCurrentDisplayAlbum(new WrestlerName('神童ミコト'));
      collection.changeCurrentDisplayAlbum(targetName);

      const albmu = collection.currentDisplayAlbum();
      expect(albmu.wrestlerName.equal(targetName)).toBeTruthy();
    });
  });

  describe('albumNames', () => {
    beforeEach(() => {
      collection.buildFromSources(SampleData.sources());
    });

    it('アルバム名の取得', () => {
      expect(collection.albumNames()).toContain(SampleData.meiName().full);
    });
  });
});

function createImageURL(key: number): TImageURL {
  return {
    original: faker.image.imageUrl(faker.datatype.number(10000)) + `_${key.toString()}`,
  };
}

export {};
