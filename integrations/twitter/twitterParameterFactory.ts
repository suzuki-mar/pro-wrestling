// App側が依存逆転をするために実装をしている

import { ITwitterParams, ITwitterQuery } from '.';
import { TwitterParams } from './twitterParams';
import { TwitterQuery } from './twitterQuery';

export class TwitterParameterFactory {
  static createParams(): ITwitterParams {
    return new TwitterParams();
  }

  static createQuery(hashtag: string): ITwitterQuery {
    return new TwitterQuery(hashtag);
  }
}
