// import { IWrestler } from 'app/sub_contexts/wreslter/interface';
import { FavoriteWrestlers } from './favoriteWrestlers';
import { MockExecutionLog } from '../components/mockModels';
import { ContextCreator } from '../../../test/contextCreator';
import { Album } from './albmu';
// import { ClientFactory } from 'db/repositrories/clientFactory';

describe('IAlbum', () => {
  beforeAll(async () => {
    await ContextCreator.createContextInWrestlerExists();
  });

  describe('downloads', () => {
    const album = new Album();
    const favoriteWrestlers = new FavoriteWrestlers();
    const log = new MockExecutionLog();

    it('完了結果を取得すること', async () => {
      const wrestlers = await favoriteWrestlers.wrestlers();

      await album.downloads(wrestlers, log);
      expect(log.isAllDownloadComplete()).toEqual(true);
    });

    it('ダウンロードの処理結果が通知されていること', async () => {
      log.notifyDownloadStatus = jest.fn();
      const wrestlers = await favoriteWrestlers.wrestlers();

      await album.downloads(wrestlers, log);
      expect(log.notifyDownloadStatus).toHaveBeenCalledTimes(wrestlers.length);
    });

    it('ダウンロードの完了結果が通知されていること', async () => {
      log.notifyAllDownloadSuccesses = jest.fn();
      const wrestlers = await favoriteWrestlers.wrestlers();

      await album.downloads(wrestlers, log);
      expect(log.notifyAllDownloadSuccesses).toHaveBeenCalledTimes(1);
    });
  });
});

export {};
