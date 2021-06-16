import { IWrestlerRepository, IWrestler } from 'app/core/wreslter/interface';
import { WrestlerRepository } from 'db/repositrories/wrestlerRepository';
import { TestData } from 'test/testData';

export class RepositoryFactory {
  private static _isConnectingToRealDB = false;

  static connectingToRealDB(): void {
    this._isConnectingToRealDB = true;
  }

  static resetStatus(): void {
    this._isConnectingToRealDB = false;
  }

  static factoryWrestlerRepository(): IWrestlerRepository {
    return this._isConnectingToRealDB
      ? new WrestlerRepository()
      : new this.MockWrestlerRepository();
  }

  public static MockWrestlerRepository = class implements IWrestlerRepository {
    async fetchAll(): Promise<IWrestler[]> {
      return TestData.marvelousWrestlers();
    }

    async addList(names: string[]): Promise<IWrestler[]> {
      return TestData.marvelousWrestlers();
    }
  };
}
