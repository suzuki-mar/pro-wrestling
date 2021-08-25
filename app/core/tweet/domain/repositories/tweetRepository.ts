import { ITwitterHashtagQuery, TPictureTweet, TTextOnlyTweet, TUserID } from 'integrations/twitter';
import { IPromoter, TWrestlerName } from 'app/wreslters';
import { ExternalServiceClientFactory } from 'infrastructure/externalServiceClientFactoryclientFactory';
import { TwitterParameterFactory } from 'integrations/twitter/twitterParameterFactory';
import { TwitterID } from 'integrations/twitter/twitterID';
import { TweetIDList } from 'app/albums/domains/tweetIDList';
import { ITweetRepository } from '../../interface';
import { TweetRepositoryForPicture } from './tweetRepositoryForPicturets';

export class TweetRepository implements ITweetRepository {
  private _forPictureRepository = new TweetRepositoryForPicture();

  async fetchPictureTweetByWrestlerNames(
    names: TWrestlerName[],
    promoters: IPromoter[]
  ): Promise<TPictureTweet[]> {
    return this._forPictureRepository.fetchPictureTweetByWrestlerNames(names, promoters);
  }

  async fetchPictureTweetsByIds(ids: TwitterID[]): Promise<TPictureTweet[]> {
    return this._forPictureRepository.fetchPictureTweetsByIds(ids);
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
