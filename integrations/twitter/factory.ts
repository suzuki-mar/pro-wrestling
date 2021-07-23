import { ClientFactory } from 'infrastructure/clientFactory';
import { ITwitter, ITwitterHashtag, ITwitterParams } from '.';
import { TwitterParams } from './params';
import { TwitterHashtag } from './twitterHashtag';

export class Factory {
  static createHashTag(): ITwitterHashtag {
    return new TwitterHashtag();
  }

  static createClient(): ITwitter {
    return ClientFactory.factoryTwitterClient();
  }

  static createParams(): ITwitterParams {
    return new TwitterParams();
  }
}
