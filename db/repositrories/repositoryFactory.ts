import { ITweetRepository, TPictureTweet } from 'app/core/tweet';
import { IWrestlerRepository, IWrestler, TWrestlerName } from 'app/core/wreslter/interface';
import { WrestlerRepository } from 'db/repositrories/wrestlerRepository';
import { SampleData } from 'db/sampleData';
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

  static factoryTweetRepository(): ITweetRepository {
    return new this.MockTweetRepository();
  }

  public static MockWrestlerRepository = class implements IWrestlerRepository {
    async fetchAll(): Promise<IWrestler[]> {
      return SampleData.wrestlers();
    }

    async addList(names: TWrestlerName[]): Promise<IWrestler[]> {
      return SampleData.wrestlers();
    }
  };

  public static MockTweetRepository = class implements ITweetRepository {
    async fetchPictureTweetByWrestlerNames(): Promise<TPictureTweet[]> {
      const tweet: TPictureTweet = {
        id: faker.datatype.number(),
        text: faker.lorem.text(),
        photoURL: new URL(faker.image.imageUrl()),
      };

      return [tweet];
    }
  };
}
