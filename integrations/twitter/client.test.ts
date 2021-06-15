import { Client } from 'integrations/twitter/client';
import { TwitterQueryOperator, TwitterFiliter } from 'integrations/twitter/interface';
import { TwitterParams } from 'integrations/twitter/params';
import { TTweet } from 'app/core/tweet';

import dotenv from 'dotenv';
dotenv.config();

describe('Twitter', () => {
  describe.skip('外部ネットワークへの接続なため必要なとき以外はテストをしない', () => {
    const client = new Client();

    it('Tweetを取得できること', async () => {
      const params = new TwitterParams();
      params
        .addFilter(TwitterFiliter.IMAGES)
        .initializeHashtaGroup('STARDOM')
        .addHashTag('中野たむ', TwitterQueryOperator.AND);

      return client.search(params).then((tweets: TTweet[]) => {
        //no-unused-expressionsの警告がでるが見た目上問題ないため無効にしている
        //eslint-disable-next-line

        expect(tweets.length).toBeGreaterThan(9);
        const tweet: TTweet = tweets[0] as TTweet;

        expect(tweet.id).not.toBeNull();
        expect(tweet.text).not.toBeNull();
      });
    });
  });
});

export {};
