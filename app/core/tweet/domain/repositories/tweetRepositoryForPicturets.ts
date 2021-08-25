import {
  ITwitterHashtagQuery,
  REQUEST_MAX_COUNT,
  TPictureTweet,
  TTextOnlyTweet,
  TweetType,
  TwitterMediaType,
} from 'integrations/twitter';
import { IPromoter, TWrestlerName } from 'app/wreslters';
import { ExternalServiceClientFactory } from 'infrastructure/externalServiceClientFactoryclientFactory';
import { TwitterParameterFactory } from 'integrations/twitter/twitterParameterFactory';
import { TwitterID } from 'integrations/twitter/twitterID';
import _ from 'lodash';

export class TweetRepositoryForPicture {
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

    const client = ExternalServiceClientFactory.factoryTwitterClient();

    const tweets = await client.multisearch(queries, params);

    const result = tweets.filter((tweet: TPictureTweet | TTextOnlyTweet) => {
      return tweet.type === TweetType.Picture;
    }) as TPictureTweet[];

    return result;
  }

  async fetchPictureTweetsByIds(ids: TwitterID[]): Promise<TPictureTweet[]> {
    let params = TwitterParameterFactory.createParams();
    params.setMediaType(TwitterMediaType.IMAGES);

    const client = ExternalServiceClientFactory.factoryTwitterClient();
    const idsList = _.chunk(ids, REQUEST_MAX_COUNT);

    const tweets = await client.multisearch(idsList, params);
    const result = tweets.filter((tweet: TPictureTweet | TTextOnlyTweet) => {
      return tweet.type === TweetType.Picture;
    }) as TPictureTweet[];

    return result;
  }

  createQuery(name: TWrestlerName, promoters: IPromoter[]): ITwitterHashtagQuery {
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
