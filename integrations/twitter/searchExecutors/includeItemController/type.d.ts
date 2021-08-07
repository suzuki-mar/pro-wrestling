import { ApiV2Includes, TweetV2 } from 'twitter-api-v2';

export interface IncludeItem {
  setUpValues(includes: ApiV2Includes);
  valid(tweet: TweetV2): boolean;
  createIncludesDatas(tweet: TweetV2): {};
  canUse(includes: ApiV2Includes): boolean;
}
