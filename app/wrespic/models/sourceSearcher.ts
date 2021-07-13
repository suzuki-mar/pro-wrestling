import { TSource } from 'app/wrespic';
import { TWrestlerName } from 'app/core/wreslter';
import { TPictureTweet } from 'integrations/twitter/interface';
import * as _ from 'loadsh';
import { RepositoryFactory } from 'db/repositrories/repositoryFactory';

export class SourceSearcher {
  async searchFromTwitter(names: TWrestlerName[]): Promise<TSource[]> {
    const pictureTweets = await this.searchPictureTweets(names);

    return this.createAllWrestlerSources(pictureTweets, names);
  }

  private createAllWrestlerSources(pictureTweets: TPictureTweet[], names: TWrestlerName[]) {
    const groupedWrestlerSources = _.map(pictureTweets, (pictureTweet: TPictureTweet) => {
      const wrestlerSources = _.map(pictureTweet.hashtags, (hashtag: string) => {
        return this.createSources(names, pictureTweet, hashtag);
      });

      return wrestlerSources;
    });

    return _.flattenDeep(groupedWrestlerSources);
  }

  private createSources(names: TWrestlerName[], tweet: TPictureTweet, hashtag: string): TSource[] {
    const wpus = _.map(names, (name: TWrestlerName) => {
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

  private async searchPictureTweets(names: TWrestlerName[]): Promise<TPictureTweet[]> {
    const tweetRepository = RepositoryFactory.factoryTweetRepository();
    const promotRepository = RepositoryFactory.factoryPromoterRepository();
    const promots = await promotRepository.featchAll();
    return tweetRepository.fetchPictureTweetByWrestlerNames(names, promots);
  }
}
