import * as _ from 'lodash';
import { TTweet, TweetType, ITwitter, ITwitterParams, TwitterFiliter } from '.';
import { TweetBuilder } from './tweetBuilder';

// 'esModuleInterop'を設定しているがコンパイル時に正しく読み込まれていない
// @ts-ignore
import Twitter, { RequestParams } from 'twitter';

export class Client implements ITwitter {
  private params: ITwitterParams;

  async multisearch(paramsList: ITwitterParams[]): Promise<TTweet[]> {
    let promises = paramsList.map((params) => {
      return this.search(params);
    });

    return Promise.all(promises).then((values) => {
      return values.flat();
    });
  }

  async search(params: ITwitterParams): Promise<TTweet[]> {
    this.params = params;

    const client = this.buildClient();
    const requestParams: RequestParams = {
      q: this.params.toQuery(),
      filter: this.params.filter(),
      count: this.params.count(),
    };

    const searchResult = await client
      .get('search/tweets', requestParams)
      .catch(function (error: unknown) {
        throw error;
      });

    const result = this.buildTweet(searchResult);

    return result;
  }

  private buildTweet(response: any): TTweet[] {
    const tweets = _.map(response['statuses'].slice(0), function (tweetData: any) {
      return TweetBuilder.build(tweetData);
    });

    if (this.params.filter() !== TwitterFiliter.IMAGES) {
      return tweets;
    }

    return _.filter(tweets, (tweet) => {
      return tweet.type === TweetType.Picture;
    });
  }

  private buildClient(): Twitter {
    return new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY!,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY!,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    });
  }
}
