import {
  ITwitterHashtagQuery,
  REQUEST_MAX_COUNT,
  TPictureTweet,
  TTextOnlyTweet,
  TUserID,
  TweetType,
  TwitterMediaType,
} from 'integrations/twitter';
import { IPromoter, TWrestlerName } from 'app/wreslters';
import { ExternalServiceClientFactory } from 'infrastructure/externalServiceClientFactoryclientFactory';
import { TwitterParameterFactory } from 'integrations/twitter/twitterParameterFactory';
import { TwitterID } from 'integrations/twitter/twitterID';
import { TweetIDList } from 'app/albums/domains/tweetIDList';
import _ from 'lodash';
import { ITweetRepository } from 'app/albums/domains/models/type';

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

  async fetchOnlyTweetsFromSinceTimeByUserIds(
    since: Date,
    userIDs: TUserID[]
  ): Promise<TTextOnlyTweet[]> {
    let params = TwitterParameterFactory.createParams();
    params.setStartTime(since);

    let query = TwitterParameterFactory.createQuery(userIDs[0]!);

    userIDs.slice(1).forEach((userID) => query.addUserID(userID));

    const client = ExternalServiceClientFactory.factoryTwitterClient();
    return await client.search(query, params);
  }

  async fetchUserIDsThatFollowsRegularly(): Promise<TUserID[]> {
    return [{ name: 'Mio0207415' }, { name: 'mei_marvelous' }];
  }

  fetchDefaultLoadingIDs(): TwitterID[] {
    return TweetIDList.list();
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
