import { TPictureTweet } from 'integrations/twitter/interface';
import {
  IWrestlerRepository,
  IWrestler,
  TWrestlerName,
  IPromoterRepository,
} from 'app/core/wreslter';

import { ITweetRepository } from 'app/wrespic';
import { WrestlerRepository } from 'db/repositrories/wrestlerRepository';
import { SampleData } from 'sampleData';
import { PromoterRepository } from './promoterRepository';
import { TweetRepository } from './tweetRepository';

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
    // 一時対策として
    return process.env.NODE_ENV !== 'test' ? new TweetRepository() : new this.MockTweetRepository();
  }

  static factoryPromoterRepository(): IPromoterRepository {
    return new PromoterRepository();
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
      return SampleData.pictureTweets();
    }
  };
}
