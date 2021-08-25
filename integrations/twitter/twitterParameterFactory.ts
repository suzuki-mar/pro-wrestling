// App側が依存逆転をするために実装をしている

import {
  ITwitterParams,
  ITwitterHashtagQuery,
  ITwitterQuery,
  TUserID,
  ITwitterUserIDQuery,
} from '.';
import { TwitterParams } from './twitterParams';
import { TwitterHashtagQuery } from './queries/twitterHashtagQuery';
import { TwitterUserIDQuery } from './queries/twitterUserIDQuery';

export class TwitterParameterFactory {
  static createParams(): ITwitterParams {
    return new TwitterParams();
  }

  static createQuery(hashtag: string): ITwitterHashtagQuery;
  static createQuery(userID: TUserID): ITwitterUserIDQuery;
  static createQuery(): ITwitterQuery;

  static createQuery(value?: any): any {
    if (typeof value === 'string') {
      return new TwitterHashtagQuery(value);
    }

    const userID = value as TUserID;
    return new TwitterUserIDQuery(userID);
  }
}
