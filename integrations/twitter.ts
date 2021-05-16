import * as _ from 'lodash';
import dotenv from 'dotenv';
import {
  Twitter as TwitterIF,
  Tweet as TweetIF,
  TwitterQuery as TwitterQueryIF,
} from './interface';
import { TwitterClient } from './library_alias';
// Libaryのクラスを使用しているためクラス自体は使わないがimportしている
import { Twitter as TwitterLibrary } from 'twitter';

dotenv.config();

export class TwitterQuery implements TwitterQueryIF {
  hastags: string[] = [];

  toString() {
    if (this.hastags.length === 0) {
      return '';
    }

    if (this.hastags.length === 1) {
      return `#${this.hastags[0]}`;
    }

    const strs = _.map(this.hastags, function (tag) {
      return `#${tag}`;
    });
    const query = strs.join(' AND ');

    return `(${query})`;
  }
}

export class Twitter implements TwitterIF {
  async search(query: TwitterQuery): Promise<Tweet[]> {
    const params = { q: query.toString() };
    const client = this.buildClient();
    return client
      .get('search/tweets', params)
      .then(function (response: TwitterLibrary.ResponseData) {
        return _.map(response['statuses'], function (tweetData: any) {
          const id = tweetData['id'] as Number;
          const text = tweetData['text'] as string;
          return new Tweet(id, text);
        });
      })
      .catch(function (error) {
        throw error;
      });
  }

  private buildClient(): TwitterClient {
    return new TwitterClient({
      consumer_key: process.env.TWITTER_CONSUMER_KEY!,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY!,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
    });
  }
}

export class Tweet implements TweetIF {
  readonly id: Number;
  readonly text: string;

  constructor(id: Number, text: string) {
    this.id = id;
    this.text = text;
  }
}
