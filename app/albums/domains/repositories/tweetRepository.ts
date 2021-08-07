import { ITweetRepository } from 'app/albums/domains/models/type';
import {
  ITwitterQuery,
  REQUEST_MAX_COUNT,
  TPictureTweet,
  TTextOnlyTweet,
  TweetType,
  TwitterMediaType,
} from 'integrations/twitter';
import { IPromoter, TWrestlerName } from 'app/wreslters';
import { ClientFactory } from 'infrastructure/clientFactory';
import { TwitterParameterFactory } from 'integrations/twitter/twitterParameterFactory';
import { TwitterID } from 'integrations/twitter/twitterID';
import { TweetIDList } from './tweetRepositories/tweetIDList';
import _ from 'lodash';

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
    const idsList = _.chunk(ids, REQUEST_MAX_COUNT);

    const tweets = await client.multisearch(idsList, params);
    const result = tweets.filter((tweet: TPictureTweet | TTextOnlyTweet) => {
      return tweet.type === TweetType.Picture;
    }) as TPictureTweet[];

    return result;
  }

  fetchDefaultLoadingIDs(): TwitterID[] {
    return TweetIDList.list();
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
