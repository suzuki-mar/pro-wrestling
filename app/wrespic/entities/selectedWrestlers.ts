import { TWrestlerPictureURL, ISelectedWrestlers } from 'app/wrespic';
import { IWrestler, TWrestlerName } from 'app/core/wreslter';
import { TPictureTweet } from 'integrations/twitter/interface';
import * as _ from 'loadsh';
import { RepositoryFactory } from 'db/repositrories/repositoryFactory';

export class SelectedWrestlers implements ISelectedWrestlers {
  private _pictureUrls: TWrestlerPictureURL[];

  constructor(private readonly wreslers: IWrestler[]) {}

  async searchFromTwitter(): Promise<void> {
    const pictureTweets = await await this.searchPictureTweets();

    const names = _.map(this.wreslers, (wresler) => {
      return wresler.name;
    }) as TWrestlerName[];

    this._pictureUrls = this.createAllWrestlerPictureURLs(pictureTweets, names);
  }

  private createAllWrestlerPictureURLs(pictureTweets: TPictureTweet[], names: TWrestlerName[]) {
    const groupedWrestlerPictureURLs = _.map(pictureTweets, (pictureTweet: TPictureTweet) => {
      const wrestlerPictureURLs = _.map(pictureTweet.hashtags, (hashtag: string) => {
        return this.createWrestlerPictureURLs(names, pictureTweet.pictureURL, hashtag);
      });

      return wrestlerPictureURLs;
    });

    return _.flattenDeep(groupedWrestlerPictureURLs);
  }

  private createWrestlerPictureURLs(
    names: TWrestlerName[],
    pictureURL: string,
    hashtag: string
  ): TWrestlerPictureURL[] {
    const wpus = _.map(names, (name: TWrestlerName) => {
      if (name.full === hashtag) {
        return {
          name: name,
          urlStr: pictureURL,
        };
      } else {
        return undefined;
      }
    }) as (TWrestlerPictureURL | undefined)[];

    return _.filter(wpus, (wpu) => {
      return wpu !== undefined;
    }) as TWrestlerPictureURL[];
  }

  private async searchPictureTweets(): Promise<TPictureTweet[]> {
    const tweetRepository = RepositoryFactory.factoryTweetRepository();
    const promotRepository = RepositoryFactory.factoryPromoterRepository();
    const promots = await promotRepository.featchAll();
    return tweetRepository.fetchPictureTweetByWrestlerNames(this.wreslers, promots);
  }

  pictureUrls(): TWrestlerPictureURL[] {
    return this._pictureUrls;
  }
}
