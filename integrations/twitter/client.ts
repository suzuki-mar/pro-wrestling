import * as _ from 'lodash';
import { TTweet, TweetType, ITwitter, ITwitterParams, TwitterFiliter } from './interface';
import { TweetBuilder } from './tweetBuilder';

// 'esModuleInterop'を設定しているがコンパイル時に正しく読み込まれていない
// @ts-ignore
import Twitter, { RequestParams } from 'twitter';

export class Client implements ITwitter {
  private params: ITwitterParams;

  async search(params: ITwitterParams): Promise<TTweet[]> {
    this.params = params;
    this.params.addCount(1);

    const client = this.buildClient();
    const requestParams: RequestParams = {
      screen_name: 'nodejs',
      q: this.params.toQuery(),
      filter: this.params.filter(),
      count: this.params.count(),
    };

    const searchResult = await client
      .get('search/tweets', requestParams)
      .catch(function (error: unknown) {
        throw error;
      });

    return this.buildTweet(searchResult);
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
