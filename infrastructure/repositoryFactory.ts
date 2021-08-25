import { TPictureTweet, TTextOnlyTweet, TUserID } from 'integrations/twitter';
import { IWrestler, TWrestlerName } from 'app/wreslters';

import {
  IWrestlerRepository,
  IPromoterRepository,
  IWrestlerQuery,
} from 'app/wreslters/domains/type';

import { IPictureRepository, PictureURLWithWrestlerNames } from 'app/albums/domains/models/type';

import { ITweetRepository } from 'app/core/tweet/interface';

import { SampleData } from 'sampleData';
import { PromoterRepository } from 'app/wreslters/domains/repositories/promoterRepository';
import { TweetRepository } from 'app/core/tweet/domain/repositories/tweetRepository';
import { TwitterID } from 'integrations/twitter/twitterID';
import { WrestlerRepository } from 'app/wreslters/domains/repositories/wrestlerRepository';
import { TPictureURL } from 'app/albums';
import { WreslerQuery } from 'app/wreslters/domains/wreslterQuery';

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

  static factoryWrestlerQuery(): IWrestlerQuery {
    return this._isConnectingToRealDB ? new WreslerQuery() : new this.MockWrestlerQuery();
  }

  static factoryTweetRepository(): ITweetRepository {
    return this._isConnectingToRealDB ? new TweetRepository() : new this.MockTweetRepository();
  }

  static factoryPictureRepository(): IPictureRepository {
    return new this.MockPictureRepository();
    // return this._isConnectingToRealDB ? new TweetRepository() : new this.MockTweetRepository();
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

  public static MockWrestlerQuery = class implements IWrestlerQuery {
    async findNames(): Promise<TWrestlerName[]> {
      return SampleData.wrestlerNames();
    }
  };

  public static MockPictureRepository = class implements IPictureRepository {
    async fetchWrestlerNames(pictureURLs: TPictureURL[]): Promise<PictureURLWithWrestlerNames[]> {
      return [SampleData.pictureURLWithWrestlerNames()];
    }
  };

  public static MockTweetRepository = class implements ITweetRepository {
    async fetchPictureTweetByWrestlerNames(): Promise<TPictureTweet[]> {
      return SampleData.pictureTweets();
    }

    async fetchPictureTweetsByIds(): Promise<TPictureTweet[]> {
      return SampleData.pictureTweets();
    }

    async fetchOnlyTweetsFromSinceTimeByUserIds(
      since: Date,
      userIDs: TUserID[]
    ): Promise<TTextOnlyTweet[]> {
      return SampleData.textTweets();
    }

    async fetchUserIDsThatFollowsRegularly(): Promise<TUserID[]> {
      return [{ name: 'Mio0207415' }, { name: 'mei_marvelous' }];
    }

    fetchDefaultLoadingIDs(): TwitterID[] {
      return [TwitterID.build('123')];
    }
  };
}
