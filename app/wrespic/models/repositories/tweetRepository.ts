import { ITweetRepository } from 'app/wrespic/models/type';
import {
  TPictureTweet,
  TTextOnlyTweet,
  TweetType,
  TwitterFiliter,
  TwitterQueryOperator,
} from 'integrations/twitter';
import { Factory } from 'integrations/twitter/factory';
import { IPromoter, TWrestlerName } from 'app/core/wreslter';
import * as _ from 'loadsh';

export class TweetRepository implements ITweetRepository {
  async fetchPictureTweetByWrestlerNames(
    names: TWrestlerName[],
    promoters: IPromoter[]
  ): Promise<TPictureTweet[]> {
    const namesList = _.chunk(names, 2);

    const paramsList = namesList.map((names) => {
      const params = TweetRepository.SearchParamsCreator.createParams(names, promoters);
      return params.setCountMax();
    });

    const client = Factory.createClient();
    const tweets = await client.multisearch(paramsList);

    const result = _.filter(tweets, (tweet: TPictureTweet | TTextOnlyTweet) => {
      return tweet.type === TweetType.Picture;
    }) as TPictureTweet[];

    return result;
  }

  public static SearchParamsCreator = class {
    static createParams(names: TWrestlerName[], promoters: IPromoter[]) {
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
