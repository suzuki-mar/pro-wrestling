import { ClientFactory } from 'db/repositrories/clientFactory';
import { Client as TwitterClient } from 'integrations/twitter/client';

describe('ClientFactory', () => {
  beforeEach(() => {
    ClientFactory.resetStatus();
  });

  describe('factoryTwitterClient', () => {
    it('Twitterのクライアントを作成する', () => {
      ClientFactory.connectingToExternalAPI();
      expect(ClientFactory.factoryTwitterClient()).toBeInstanceOf(TwitterClient);
    });

    it('ダミーのTwitterのクライアントを作成する', () => {
      expect(ClientFactory.factoryTwitterClient()).toBeInstanceOf(ClientFactory.MockTwitterClient);
    });
  });
});
export {};
