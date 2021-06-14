import { RepositoryFactory } from 'db/repositrories/repositoryFactory';
import { WrestlerRepository } from 'db/repositrories/wrestlerRepository';

describe('RepositoryFactory', () => {
  beforeEach(() => {
    RepositoryFactory.resetStatus();
  });

  describe('factoryWrestlerRepository', () => {
    it('DBに実際につながるリポジトリを作成する', () => {
      RepositoryFactory.connectingToRealDB();
      expect(RepositoryFactory.factoryWrestlerRepository()).toBeInstanceOf(WrestlerRepository);
    });

    it('ダミーのリポジトリを作成する', async () => {
      expect(RepositoryFactory.factoryWrestlerRepository()).toBeInstanceOf(
        RepositoryFactory.MockWrestlerRepository
      );
    });
  });
});
export {};
