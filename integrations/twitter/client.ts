import * as _ from 'lodash';
import dotenv from 'dotenv';
import { ITwitter, ITweet, ITwitterParams } from '../interface';
import { TwitterClient } from '../library_alias';
// Libaryのクラスを使用しているためクラス自体は使わないがimportしている
import { Twitter as TwitterLibrary } from 'twitter';
import { Logger } from 'app/core/lib';

export class Twitter implements ITwitter {
  async search(params: ITwitterParams): Promise<ITweet[]> {
    const client = this.buildClient();
    return await client
      .get('search/tweets', params.toHash())
      .then(function (response: TwitterLibrary.ResponseData) {
        return _.map(response['statuses'], function (tweetData: any) {
          return Tweet.build(tweetData);
        });
      })
      .catch(function (error) {
        throw error;
      });
  }

  // https://twitter.com/intent/retweet?tweet_id=1394872423397269510

  private buildClient(): TwitterClient {
    return new TwitterClient({
      consumer_key: process.env.TWITTER_CONSUMER_KEY!,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY!,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    });
  }
}

export class Tweet implements ITweet {
  private _id: Number;
  private _text: string;
  private _photo_url: URL;

  id(): Number {
    return this._id;
  }

  text(): string {
    return this._text;
  }

  photo_url(): URL {
    return this._photo_url;
  }

  private constructor() {}

  static build(data: any): TweetIF {
    const tweet = new Tweet();

    tweet._id = data['id_str'] as Number;
    tweet._text = data['text'] as string;

    // FIXME 一旦画像は１つだけの前提

    const media = data['entities']['media'];
    if (media !== undefined) {
      const medium = media[0];
      if (medium['type'] === 'photo') {
        tweet._photo_url = new URL(medium['media_url']);
      }
    }

    return tweet;
  }
}
