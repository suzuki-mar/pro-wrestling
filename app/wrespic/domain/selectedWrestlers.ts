import { TSource, ISelectedWrestlers } from 'app/wrespic';
import { IWrestlerName } from 'app/core/wreslter';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { TPictureTweet } from 'integrations/twitter/interface';
import * as _ from 'loadsh';
import { RepositoryFactory } from 'db/repositrories/repositoryFactory';

export class SelectedWrestlers implements ISelectedWrestlers {
  private _sources: TSource[] = [];
  private _names: IWrestlerName[] = [];

  selectWreslerName(name: WrestlerName): IWrestlerName[] {
    const nextNames = this._names.slice(0, this._names.length);

    const sameNames = this._names.find((n) => {
      return n.equal(name);
    });

    if (sameNames !== undefined) {
      console.warn('同じレスラーを追加しようとした');
      return this._names;
    }

    nextNames.push(name);
    this._names = nextNames;

    return this._names;
  }

  async searchFromTwitter(): Promise<void> {
    const pictureTweets = await this.searchPictureTweets();

    this._sources = this.createAllWrestlerPictureURLs(pictureTweets, this._names);
  }

  private createAllWrestlerPictureURLs(pictureTweets: TPictureTweet[], names: IWrestlerName[]) {
    const groupedWrestlerPictureURLs = _.map(pictureTweets, (pictureTweet: TPictureTweet) => {
      const wrestlerPictureURLs = _.map(pictureTweet.hashtags, (hashtag: string) => {
        return this.createWrestlerPictureURLs(names, pictureTweet, hashtag);
      });

      return wrestlerPictureURLs;
    });

    return _.flattenDeep(groupedWrestlerPictureURLs);
  }

  private createWrestlerPictureURLs(
    names: IWrestlerName[],
    tweet: TPictureTweet,
    hashtag: string
  ): TSource[] {
    const wpus = _.map(names, (name: IWrestlerName) => {
      if (name.full === hashtag) {
        return {
          name: name,
          urlStr: tweet.pictureURL,
          dateStr: tweet.tweeted_at,
        };
      } else {
        return undefined;
      }
    }) as (TSource | undefined)[];

    return _.filter(wpus, (wpu) => {
      return wpu !== undefined;
    }) as TSource[];
  }

  private async searchPictureTweets(): Promise<TPictureTweet[]> {
    const tweetRepository = RepositoryFactory.factoryTweetRepository();
    const promotRepository = RepositoryFactory.factoryPromoterRepository();
    const promots = await promotRepository.featchAll();
    return tweetRepository.fetchPictureTweetByWrestlerNames(this._names, promots);
  }

  pictureUrls(): TSource[] {
    return this._sources;
  }

  names(): IWrestlerName[] {
    return this._names;
  }
}
