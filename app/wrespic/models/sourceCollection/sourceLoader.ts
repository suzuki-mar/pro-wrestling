import { TSource, TImageURL } from 'app/wrespic';
import { TWrestlerName } from 'app/core/wreslter';
import { TPictureTweet } from 'integrations/twitter';
import * as _ from 'loadsh';
import { RepositoryFactory } from 'db/repositrories/repositoryFactory';

export class SourceLoader {
  async load(names: TWrestlerName[]): Promise<TSource[]> {
    const pictureTweets = await this.searchPictureTweets(names);
    let sources = this.loadWrestlerSources(names, pictureTweets);
    return this.sortedByWrestlerName(names, sources);
  }

  private loadWrestlerSources(names: TWrestlerName[], pictureTweets: TPictureTweet[]): TSource[] {
    const groupedPictureTweetSources = pictureTweets.map((pictureTweet) => {
      let sourcesList = pictureTweet.hashtags.map((hashtag) => {
        return this.createSources(names, pictureTweet, hashtag);
      });
      sourcesList = sourcesList.filter((sources) => {
        return sources.length > 0;
      });

      return sourcesList;
    });

    return _.flattenDeep(groupedPictureTweetSources);
  }

  private sortedByWrestlerName(names: TWrestlerName[], sources: TSource[]): TSource[] {
    let groupedWreslterSources = {};

    names.forEach((name) => {
      groupedWreslterSources[name.full] = [];
    });

    sources.forEach((source) => {
      groupedWreslterSources[source.name.full].push(source);
    });

    let sortedSource = [];

    names.forEach((name) => {
      sortedSource = sortedSource.concat(groupedWreslterSources[name.full]);
    });

    return sortedSource;
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
        const imageURL: TImageURL = {
          original: tweet.pictureURL,
        };

        const source: TSource = {
          name: name,
          imageURL: imageURL,
          date: tweet.tweeted_at,
          contributor: tweet.contributor,
        };
        return source;
      } else {
        return undefined;
      }
    }) as (TSource | undefined)[];

    return sources.filter((source) => {
      return source !== undefined;
    }) as TSource[];
  }
}
