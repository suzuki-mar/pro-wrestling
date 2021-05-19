import { Twitter, Tweet } from './client';
import { TwitterQueryOperator, TwitterFiliter } from '../interface';
import { TwitterParams } from './params';

import dotenv from 'dotenv';
dotenv.config();

describe('Twitter', () => {
  describe('外部ネットワークへの接続なため必要なとき以外はテストをしない', () => {
    const twitter = new Twitter();

    it('Tweetを取得できること', async () => {
      const params = new TwitterParams();
      params
        .addFilter(TwitterFiliter.IMAGES)
        .initializeHashtaGroup('STARDOM')
        .addHashTag('中野たむ', TwitterQueryOperator.AND);

      return twitter.search(params).then((tweets: Tweet[]) => {
        //no-unused-expressionsの警告がでるが見た目上問題ないため無効にしている
        //eslint-disable-next-line

        expect(tweets.length).toBeGreaterThan(9);
        expect(tweets[0].id).not.toBeNull();
        expect(tweets[0].text).not.toBeNull();
      });
    });
  });
});

export {};
