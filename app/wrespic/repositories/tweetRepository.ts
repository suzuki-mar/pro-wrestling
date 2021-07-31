import { ITweetRepository } from 'app/wrespic/models/type';
import {
  ITwitterQuery,
  TPictureTweet,
  TTextOnlyTweet,
  TweetType,
  TwitterMediaType,
} from 'integrations/twitter';
import { IPromoter, TWrestlerName } from 'app/core/wreslter';
import { ClientFactory } from 'infrastructure/clientFactory';
import { TwitterParameterFactory } from 'integrations/twitter/twitterParameterFactory';
import { TwitterID } from 'integrations/twitter/twitterID';

export class TweetRepository implements ITweetRepository {
  async fetchPictureTweetByWrestlerNames(
    names: TWrestlerName[],
    promoters: IPromoter[]
  ): Promise<TPictureTweet[]> {
    let params = TwitterParameterFactory.createParams();
    params.setCountMax();
    params.setMediaType(TwitterMediaType.IMAGES);

    const queries = names.map((name) => {
      return this.createQuery(name, promoters);
    });

    const client = ClientFactory.factoryTwitterClient();

    const tweets = await client.multisearch(queries, params);

    const result = tweets.filter((tweet: TPictureTweet | TTextOnlyTweet) => {
      return tweet.type === TweetType.Picture;
    }) as TPictureTweet[];

    return result;
  }

  async fetchPictureTweetsByIds(ids: TwitterID[]): Promise<TPictureTweet[]> {
    let params = TwitterParameterFactory.createParams();
    params.setMediaType(TwitterMediaType.IMAGES);

    const client = ClientFactory.factoryTwitterClient();

    const tweets = await client.search(ids, params);
    const result = tweets.filter((tweet: TPictureTweet | TTextOnlyTweet) => {
      return tweet.type === TweetType.Picture;
    }) as TPictureTweet[];

    return result;
  }

  fetchDefaultLoadingIDs(): TwitterID[] {
    const idValues = ['1368182865599459328', '1420592812462985218'];
    return idValues.map((value) => TwitterID.build(value));
  }

  createQuery(name: TWrestlerName, promoters: IPromoter[]): ITwitterQuery {
    const promoter = promoters.find((promoter: IPromoter) => {
      return promoter.isBelongTo(name);
    });

    const query = TwitterParameterFactory.createQuery(name.full);
    if (!name.unique) {
      query.addHashtag(promoter!.hashtag);
    }

    return query;
  }
}
