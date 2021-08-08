import { TPictureTweet } from 'integrations/twitter';
import { IWrestler, TWrestlerName } from 'app/wreslters';

import { IWrestlerRepository, IPromoterRepository } from 'app/wreslters/domains/type';

import { ITweetRepository } from 'app/albums/domains/models/type';
import { SampleData } from 'sampleData';
import { PromoterRepository } from 'app/wreslters/domains/repositories/promoterRepository';
import { TweetRepository } from 'app/albums/domains/repositories/tweetRepository';
import { TwitterID } from 'integrations/twitter/twitterID';
import { WrestlerRepository } from 'app/wreslters/domains/repositories/wrestlerRepository';

export class RepositoryFactory {
  private static _isConnectingToRealDB = process.env.NODE_ENV === 'test' ? false : true;

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
    return this._isConnectingToRealDB ? new TweetRepository() : new this.MockTweetRepository();
  }

  static factoryPromoterRepository(): IPromoterRepository {
    return new PromoterRepository();
  }

  public static MockWrestlerRepository = class implements IWrestlerRepository {
    async fetchAll(): Promise<IWrestler[]> {
      return SampleData.wrestlers();
    }

    async fetchByName(name: TWrestlerName): Promise<IWrestler> {
      return SampleData.wrestler();
    }

    async add(names: TWrestlerName): Promise<IWrestler> {
      return SampleData.wrestler();
    }
  };

  public static MockTweetRepository = class implements ITweetRepository {
    async fetchPictureTweetByWrestlerNames(): Promise<TPictureTweet[]> {
      return SampleData.pictureTweets();
    }

    async fetchPictureTweetsByIds(): Promise<TPictureTweet[]> {
      return SampleData.pictureTweets();
    }

    fetchDefaultLoadingIDs(): TwitterID[] {
      return [TwitterID.build('123')];
    }
  };
}
