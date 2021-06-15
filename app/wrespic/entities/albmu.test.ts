import { FavoriteWrestlers } from 'app/wrespic/entities/favoriteWrestlers';
import { MockExecutionLog, MockPhoto } from 'app/wrespic/mock';
import { Album } from 'app/wrespic/entities/albmu';
import faker from 'faker';
import { IWrestler } from 'app/core/wreslter/interface';

describe('IAlbum', () => {
  describe('downloads', () => {
    const album = new Album();
    const favoriteWrestlers = new FavoriteWrestlers();
    const log = new MockExecutionLog();

    it('完了結果を取得すること', async () => {
      const wrestlers = await favoriteWrestlers.wrestlers();
      const photo = buildPhoto(wrestlers[0]);

      await album.uploads([photo], log);
      expect(log.isAllDownloadComplete()).toEqual(true);
    });

    it('ダウンロードの処理結果が通知されていること', async () => {
      log.notifyUploadedPhoto = jest.fn();

      const wrestlers = await favoriteWrestlers.wrestlers();
      const photo = buildPhoto(wrestlers[0]);

      await album.uploads([photo], log);
      expect(log.notifyUploadedPhoto).toHaveBeenCalledTimes(wrestlers.length);
    });

    it('ダウンロードの完了結果が通知されていること', async () => {
      log.notifyAllUploaded = jest.fn();

      const wrestlers = await favoriteWrestlers.wrestlers();
      const photo = buildPhoto(wrestlers[0]);

      await album.uploads([photo], log);
      expect(log.notifyAllUploaded).toHaveBeenCalledTimes(1);
    });
  });
});

const buildPhoto = (wrestler: IWrestler | undefined) => {
  const url = new URL(faker.image.imageUrl());
  return new MockPhoto(wrestler as IWrestler, url);
};

export {};
