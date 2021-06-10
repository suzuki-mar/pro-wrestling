import { DownloadStatus, IListener } from './interface';
import { MockExecutionLog } from './mockModels';
import * as _ from 'lodash';
import { Wrestler } from '../../sub_contexts/wreslter/wrestler';

class MockListener implements IListener {
  update(status: DownloadStatus): void {}

  updateAllFinsh(status: DownloadStatus): void {}
}

describe('IExecutionLog', () => {
  describe('addProcessListener', () => {
    it('リスナーが登録されていること', () => {
      const log = new MockExecutionLog();
      const listner = new MockListener();
      log.addProcessListener(listner);

      expect(log.listeners[0]).toEqual(listner);
    });
  });

  describe('一連の通知処理', () => {
    it('一定時間後にtrueが変えること', async () => {
      const log = new MockExecutionLog();
      const wrestler = new Wrestler('test');

      const status: DownloadStatus = { success: false, wresler: wrestler };
      log.notifyDownloadStatus(status);

      log.notifyAllDownloadSuccesses();

      expect(log.isAllDownloadComplete()).toEqual(false);
    });
  });
});

export {};
