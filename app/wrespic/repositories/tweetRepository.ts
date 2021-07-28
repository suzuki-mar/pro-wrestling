import { ITweetRepository } from 'app/wrespic/models/type';
import {
  ITwitterParams,
  TPictureTweet,
  TTextOnlyTweet,
  TweetType,
  TwitterFiliter,
  TwitterQueryOperator,
} from 'integrations/twitter';
import { Factory } from 'integrations/twitter/factory';
import { IPromoter, TWrestlerName } from 'app/core/wreslter';

export class TweetRepository implements ITweetRepository {
  async fetchPictureTweetByWrestlerNames(
    names: TWrestlerName[],
    promoters: IPromoter[]
  ): Promise<TPictureTweet[]> {
    const paramsList = names.map((name) => {
      const params = this.createSearchParams(name, promoters);
      return params.setCountMax();
    });

    const client = Factory.createClient();
    const tweets = await client.multisearch(paramsList);

    const result = tweets.filter((tweet: TPictureTweet | TTextOnlyTweet) => {
      return tweet.type === TweetType.Picture;
    }) as TPictureTweet[];

    return result;
  }

  createSearchParams(name: TWrestlerName, promoters: IPromoter[]): ITwitterParams {
    const params = Factory.createParams();
    params.setCountMax();
    params.addFilter(TwitterFiliter.IMAGES);

    const promoter = promoters.find((promoter: IPromoter) => {
      return promoter.isBelongTo(name);
    });

    const hashtag = Factory.createHashTag();
    hashtag.initialize(name.full);
    if (!name.unique) {
      hashtag.addString(promoter!.hashtag, TwitterQueryOperator.AND);
    }

    params.addHashTag(hashtag);

    return params;
  }
}
