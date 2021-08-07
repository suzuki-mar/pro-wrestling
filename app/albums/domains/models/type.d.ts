import { TwitterID } from 'integrations/twitter/twitterID';

export interface ITweetRepository {
  fetchPictureTweetByWrestlerNames(
    names: TWrestlerName[],
    poromoters: IPromoter[]
  ): Promise<TPictureTweet[]>;

  fetchPictureTweetsByIds(ids: TwitterID[]): Promise<TPictureTweet[]>;
  fetchDefaultLoadingIDs(): TwitterID[];
}
