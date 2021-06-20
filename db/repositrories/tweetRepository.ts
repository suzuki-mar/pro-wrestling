import { ITweetRepository } from 'app/wrespic';
import {
  TPictureTweet,
  TTextOnlyTweet,
  TweetType,
  TwitterFiliter,
  TwitterQueryOperator,
} from 'integrations/twitter/interface';
import { Factory } from 'integrations/twitter/factory';
import { IWrestler, IPromoter } from 'app/core/wreslter';
import * as _ from 'lodash';

export class TweetRepository implements ITweetRepository {
  async fetchPictureTweetByWrestlerNames(
    wrestlers: IWrestler[],
    promoters: IPromoter[]
  ): Promise<TPictureTweet[]> {
    const params = TweetRepository.SearchParamsCreator.createParams(wrestlers, promoters);

    const client = Factory.createClient();
    const tweets = await client.search(params);

    const result = _.filter(tweets, (tweet: TPictureTweet | TTextOnlyTweet) => {
      return tweet.type === TweetType.Picture;
    }) as TPictureTweet[];

    return result;
  }

  public static SearchParamsCreator = class {
    static createParams(wrestlers: IWrestler[], promoters: IPromoter[]) {
      const params = Factory.createParams();
      params.addCountMax();
      params.addFilter(TwitterFiliter.IMAGES);

      _.each(wrestlers, (wresler: IWrestler) => {
        const promoter = _.find(promoters, (promoter: IPromoter) => {
          return wresler.currentBelongsPromoterName.shortName === promoter.name.shortName;
        });

        const hashtag = Factory.createHashTag();
        hashtag
          .initialize(wresler.name.full)
          .addString(promoter!.hashtag, TwitterQueryOperator.AND);
        params.addHashTag(hashtag);
      });

      return params;
    }
  };
}
