import { IWrestlerRepository, IWrestler } from 'app/sub_contexts/wreslter/interface';
import { Wrestler } from 'app/sub_contexts/wreslter/wrestler';
import { WrestlerRepository } from 'db/repositrories/wrestlerRepository';
import faker from 'faker';

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
      // TODO レスラーの名前を使用したい
      return [new Wrestler(faker.name.firstName())];
    }
  };
}
