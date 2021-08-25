import { TTweet, TweetType, ITwitter, ITwitterParams, TwitterMediaType, ITwitterQuery } from '.';
import { TweetBuilder } from './tweetBuilder';
import { TwitterID } from './twitterID';
import { SearchExecutor } from './searchExecutors/searchExecutor';
import { SearchResponseItem } from './searchExecutors/type.d';
import * as _ from 'loadsh';
import { TwitterQuery } from './queries/twitterQuery';
import { TwitterParams } from './params/twitterParams';

export class Client implements ITwitter {
  private params: ITwitterParams;

  async multisearch(
    args: (ITwitterQuery | TwitterID[])[],
    params: ITwitterParams
  ): Promise<TTweet[]> {
    let promises = args.map((arg) => {
      return this.search(arg, params);
    });

    return Promise.all(promises).then((values) => {
      return values.flat();
    });
  }

  async search(arg: ITwitterQuery | TwitterID[], params: ITwitterParams): Promise<TTweet[]> {
    this.params = params;

    const executor = new SearchExecutor(params as TwitterParams);

    let responses: SearchResponseItem[] | undefined;

    if (Array.isArray(arg)) {
      const targetIds = arg as TwitterID[];
      responses = await executor.executeFromIds(targetIds);
    } else {
      const query = arg as TwitterQuery;
      responses = await executor.executeFromQeuery(query);
    }

    if (responses === undefined) {
      return [];
    }

    const result = this.buildTweets(responses);

    return result;
  }

  private buildTweets(responses: SearchResponseItem[]): TTweet[] {
    const tweets = responses.map((item) => {
      return TweetBuilder.build(item);
    });

    if (this.params.mediaType() !== TwitterMediaType.IMAGES) {
      return tweets;
    }

    return _.filter(tweets, (tweet) => {
      return tweet.type === TweetType.Picture;
    });
  }
}
