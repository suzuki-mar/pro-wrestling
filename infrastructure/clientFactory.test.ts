import { ClientFactory } from 'infrastructure/clientFactory';
import { Client as TwitterClient } from 'integrations/twitter/client';

describe('ClientFactory', () => {
  describe('isConnectingToExternalAPI', () => {
    it('Test環境はfalseが返ること', () => {
      expect(ClientFactory.isConnectingToExternalAPI()).toBeFalsy();
    });
  });

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
