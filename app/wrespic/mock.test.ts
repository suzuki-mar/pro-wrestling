import { IListener, IAlbum } from 'app/wrespic/components/interface';
import { MockExecutionLog, MockPhoto } from 'app/wrespic/mock';
import { Wrestler } from 'app/sub_contexts/wreslter/wrestler';
import { IPhoto } from 'app/wrespic/interface';
import faker from 'faker';
import { Album } from 'app/wrespic/entities/albmu';

class MockListener implements IListener {
  update(photo: IPhoto): void {}

  updateAllFinsh(albmu: IAlbum): void {}
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
      const url = new URL(faker.image.imageUrl());

      const photo: IPhoto = new MockPhoto(wrestler, url);
      log.notifyUploadedPhoto(photo);

      const albmu = new Album();

      log.notifyAllUploaded(albmu);

      expect(log.isAllDownloadComplete()).toEqual(true);
    });
  });
});

export {};
