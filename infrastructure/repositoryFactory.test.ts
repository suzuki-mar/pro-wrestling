import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import { TweetRepository } from 'app/albums/domains/repositories/tweetRepository';

describe('RepositoryFactory', () => {
  beforeEach(() => {
    RepositoryFactory.resetStatus();
  });

  describe('connectingToRealDB', () => {
    it('DBに実際につながるリポジトリを作成する', () => {
      RepositoryFactory.connectingToRealDB();
      expect(RepositoryFactory.factoryTweetRepository()).toBeInstanceOf(TweetRepository);
    });

    it('ダミーのリポジトリを作成する', async () => {
      expect(RepositoryFactory.factoryWrestlerRepository()).not.toBeInstanceOf(TweetRepository);
    });
  });
});
export {};
