import { PrismaClient } from '@prisma/client';
import { ClientFactory } from 'db/repositrories/clientFactory';
import { Client as TwitterClient } from 'integrations/twitter/client';

describe('ClientFactory', () => {
  beforeEach(() => {
    ClientFactory.resetStatus();
  });

  describe('factoryPrismaClient', () => {
    it('Prismaのクライアントを作成する', () => {
      expect(ClientFactory.factoryPrismaClient()).toBeInstanceOf(PrismaClient);
    });
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
