import {
  IWrestlerRepository,
  IPromoterRepository,
  IWrestlerQuery,
} from 'app/wreslters/domains/type';

import { IPictureRepository } from 'app/albums/domains/models/type';

import { ITweetRepository } from 'app/core/tweet/interface';
import { PromoterRepository } from 'app/wreslters/domains/repositories/promoterRepository';
import { TweetRepository } from 'app/core/tweet/domain/repositories/tweetRepository';
import { WrestlerRepository } from 'app/wreslters/domains/repositories/wrestlerRepository';
import { WreslerQuery } from 'app/wreslters/domains/wreslterQuery';
import {
  MockPictureRepository,
  MockTweetRepository,
  MockWrestlerQuery,
  MockWrestlerRepository,
} from './repositoryFactoryMocs';

export class RepositoryFactory {
  private static _isConnectingToRealDB = process.env.NODE_ENV === 'test' ? false : true;

  static connectingToRealDB(): void {
    this._isConnectingToRealDB = true;
  }

  static resetStatus(): void {
    this._isConnectingToRealDB = false;
  }

  static factoryWrestlerRepository(): IWrestlerRepository {
    return this._isConnectingToRealDB ? new WrestlerRepository() : new MockWrestlerRepository();
  }

  static factoryWrestlerQuery(): IWrestlerQuery {
    return this._isConnectingToRealDB ? new WreslerQuery() : new MockWrestlerQuery();
  }

  static factoryTweetRepository(): ITweetRepository {
    return this._isConnectingToRealDB ? new TweetRepository() : new MockTweetRepository();
  }

  static factoryPictureRepository(): IPictureRepository {
    return new MockPictureRepository();
    // return this._isConnectingToRealDB ? new TweetRepository() : new this.MockTweetRepository();
  }

  static factoryPromoterRepository(): IPromoterRepository {
    return new PromoterRepository();
  }
}
