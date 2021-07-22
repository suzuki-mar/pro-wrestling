import { TPictureTweet } from 'integrations/twitter';
import {
  IWrestlerRepository,
  IWrestler,
  TWrestlerName,
  IPromoterRepository,
} from 'app/core/wreslter';

import { ITweetRepository } from 'app/wrespic';
import { SampleData } from 'sampleData';
import { PromoterRepository } from './promoterRepository';
import { TweetRepository } from './tweetRepository';

export class RepositoryFactory {
  private static _isConnectingToRealDB = process.env.NODE_ENV === 'test' ? false : true;

  static connectingToRealDB(): void {
    this._isConnectingToRealDB = true;
  }

  static resetStatus(): void {
    this._isConnectingToRealDB = false;
  }

  static factoryWrestlerRepository(): IWrestlerRepository {
    // 固定のデータを返すだけでいいので、一旦DBは使用していない
    return new this.MockWrestlerRepository();
  }

  static factoryTweetRepository(): ITweetRepository {
    return this._isConnectingToRealDB ? new TweetRepository() : new this.MockTweetRepository();
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
