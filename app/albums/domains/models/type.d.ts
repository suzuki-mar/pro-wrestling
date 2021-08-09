import { TPictureURL } from 'app/albums';
import { TwitterID } from 'integrations/twitter/twitterID';

export interface ITweetRepository {
  fetchPictureTweetByWrestlerNames(
    names: TWrestlerName[],
    poromoters: IPromoter[]
  ): Promise<TPictureTweet[]>;

  fetchPictureTweetsByIds(ids: TwitterID[]): Promise<TPictureTweet[]>;
  fetchDefaultLoadingIDs(): TwitterID[];
}

export type PictureURLWithWrestlerNames = {
  names: TWrestlerName[];
  url: string;
};

export interface IPictureRepository {
  fetchWrestlerNames(pictureUrls: TPictureURL[]): Promise<PictureURLWithWrestlerNames[]>;
}
