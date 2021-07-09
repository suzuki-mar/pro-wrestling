import { ITweetRepository } from 'app/wrespic';
import {
  TPictureTweet,
  TTextOnlyTweet,
  TweetType,
  TwitterFiliter,
  TwitterQueryOperator,
} from 'integrations/twitter/interface';
import { Factory } from 'integrations/twitter/factory';
import { IPromoter, IWrestlerName } from 'app/core/wreslter';
import * as _ from 'lodash';

export class TweetRepository implements ITweetRepository {
  async fetchPictureTweetByWrestlerNames(
    names: IWrestlerName[],
    promoters: IPromoter[]
  ): Promise<TPictureTweet[]> {
    const params = TweetRepository.SearchParamsCreator.createParams(names, promoters);

    const client = Factory.createClient();
    const tweets = await client.search(params);

    const result = _.filter(tweets, (tweet: TPictureTweet | TTextOnlyTweet) => {
      return tweet.type === TweetType.Picture;
    }) as TPictureTweet[];

    return result;
  }

  public static SearchParamsCreator = class {
    static createParams(names: IWrestlerName[], promoters: IPromoter[]) {
      const params = Factory.createParams();
      params.setCountMax();
      params.addFilter(TwitterFiliter.IMAGES);

      names.forEach((name) => {
        const promoter = promoters.find((promoter: IPromoter) => {
          return promoter.isBelongTo(name);
        });

        const hashtag = Factory.createHashTag();
        hashtag.initialize(name.full).addString(promoter!.hashtag, TwitterQueryOperator.AND);
        params.addHashTag(hashtag);
      });

      return params;
    }
  };
}
