import { TSource, ISourceCollection } from 'app/wrespic';
import { TWrestlerName } from 'app/core/wreslter';
import { TPictureTweet } from 'integrations/twitter/interface';
import * as _ from 'loadsh';
import { RepositoryFactory } from 'db/repositrories/repositoryFactory';

export class SourceCollection implements ISourceCollection {
  private _sources: TSource[] = [];

  async load(names: TWrestlerName[]): Promise<void> {
    const pictureTweets = await this.searchPictureTweets(names);
    this._sources = this.createAllWrestlerSources(names, pictureTweets);
  }

  rebuild(sources: TSource[]) {
    this._sources = sources;
  }

  filterFromSelected(targetNames: TWrestlerName[]): TSource[] {
    let sources: TSource[] = [];

    this._sources.forEach((source) => {
      targetNames.forEach((name) => {
        if (source.name.equal(name)) {
          sources = [...sources, source];
        }
      });
    });
    return sources;
  }

  private createAllWrestlerSources(
    names: TWrestlerName[],
    pictureTweets: TPictureTweet[]
  ): TSource[] {
    const groupedWrestlerSources = pictureTweets.map((pictureTweet) => {
      const wrestlerSources = pictureTweet.hashtags.map((hashtag) => {
        return this.createSources(names, pictureTweet, hashtag);
      });

      return wrestlerSources;
    });

    return _.flattenDeep(groupedWrestlerSources);
  }

  sources(): TSource[] {
    return this._sources;
  }

  private async searchPictureTweets(names: TWrestlerName[]): Promise<TPictureTweet[]> {
    const tweetRepository = RepositoryFactory.factoryTweetRepository();
    const promotRepository = RepositoryFactory.factoryPromoterRepository();
    const promots = await promotRepository.featchAll();
    return tweetRepository.fetchPictureTweetByWrestlerNames(names, promots);
  }

  private createSources(names: TWrestlerName[], tweet: TPictureTweet, hashtag: string): TSource[] {
    const sources = names.map((name) => {
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

    return sources.filter((source) => {
      return source !== undefined;
    }) as TSource[];
  }
}
