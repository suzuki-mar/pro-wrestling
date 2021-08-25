import { ExternalServiceClientFactory } from 'infrastructure/externalServiceClientFactoryclientFactory';
import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import { TicketContentCollection } from './ticketContentCollection';

describe('notifyOfLoadedTicketContents', () => {
  const collection = new TicketContentCollection();

  beforeEach(async () => {
    await collection.loadRecentlyCreatedRinsaiTicketIfCreated();
  });

  it('プッシュしてあること', async () => {
    const logs = await collection.notifyOfLoadedTicketContents();
    expect(logs[0]!.success).toBeTruthy();
  });
});

describe('buildRecentlyCreatedRinsaiTicketIfCreated', () => {
  describe.skip('実際に実行する 必要なとき以外はSKIPする', () => {
    beforeEach(() => {
      RepositoryFactory.connectingToRealDB();
      ExternalServiceClientFactory.connectingToExternalAPI();
    });

    afterEach(() => {
      ExternalServiceClientFactory.resetStatus();
      RepositoryFactory.resetStatus();
    });

    // チケットが発行されているほうがまれなため処理が完了できたらOKとする
    it('処理を実行できること', async () => {
      const collection = new TicketContentCollection();

      let success = true;
      try {
        await collection.loadRecentlyCreatedRinsaiTicketIfCreated();
        success = true;
      } catch {
        success = false;
      }

      expect(success).toBeTruthy();
    });
  });

  describe('チケット情報を取得できること', () => {
    it('処理を実行できること', async () => {
      const collection = new TicketContentCollection();
      await collection.loadRecentlyCreatedRinsaiTicketIfCreated();

      expect(collection.tickets().length).toEqual(1);
    });
  });
});

export {};
