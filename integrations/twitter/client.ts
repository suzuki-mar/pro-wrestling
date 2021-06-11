import * as _ from 'lodash';
import { ITwitter, Tweet, ITwitterParams } from './interface';
// Libaryのクラスを使用しているためクラス自体は使わないがimportしている
import Twitter, { RequestParams } from 'twitter';

export class Client implements ITwitter {
  async search(params: ITwitterParams): Promise<Tweet[]> {
    const client = this.buildClient();
    const requestParams: RequestParams = {
      screen_name: 'nodejs',
      q: '(#STARDOM AND #中野たむ)',
      filter: 'images',
    };
    return client
      .get('search/tweets', requestParams)
      .then(function (response: Twitter.ResponseData) {
        const tweets = _.map(response['statuses'], function (tweetData: any) {
          return TweetBuilder.build(tweetData);
        });
        return tweets;
      })
      .catch(function (error: unknown) {
        throw error;
      });
  }

  // https://twitter.com/intent/retweet?tweet_id=1394872423397269510

  private buildClient(): Twitter {
    return new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY!,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY!,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    });
  }
}

export class TweetBuilder {
  static build(data: any): Tweet {
    const media = data['entities']['media'];

    return {
      id: data['id_str'] as Number,
      text: data['text'] as string,
      photoURL: this.buildPhotoURL(media),
    };
  }

  // FIXME 一旦画像は１つだけの前提
  private static buildPhotoURL(media: any): URL | undefined {
    if (media === undefined) {
      return undefined;
    }

    const medium = media[0];
    if (medium['type'] === 'photo') {
      return new URL(medium['media_url']);
    }

    return undefined;
  }
}
