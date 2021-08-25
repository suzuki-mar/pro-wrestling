import { ExternalServiceClientFactory } from 'infrastructure/externalServiceClientFactoryclientFactory';
import { Client as TwitterClient } from 'integrations/twitter/client';

describe('ClientFactory', () => {
  describe('isConnectingToExternalAPI', () => {
    it('Test環境はfalseが返ること', () => {
      expect(ExternalServiceClientFactory.isConnectingToExternalAPI()).toBeFalsy();
    });
  });

  beforeEach(() => {
    ExternalServiceClientFactory.resetStatus();
  });

  describe('factoryTwitterClient', () => {
    it('Twitterのクライアントを作成する', () => {
      ExternalServiceClientFactory.connectingToExternalAPI();
      expect(ExternalServiceClientFactory.factoryTwitterClient()).toBeInstanceOf(TwitterClient);
    });

    it('ダミーのTwitterのクライアントを作成する', () => {
      expect(ExternalServiceClientFactory.factoryTwitterClient()).toBeInstanceOf(
        ExternalServiceClientFactory.MockTwitterClient
      );
    });
  });
});
export {};
