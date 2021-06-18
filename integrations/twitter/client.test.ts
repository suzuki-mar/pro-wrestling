import { Client } from 'integrations/twitter/client';
import {
  TwitterQueryOperator,
  TwitterFiliter,
  TTweetBase,
  TweetType,
} from 'integrations/twitter/interface';
import { TwitterParams } from 'integrations/twitter/params';
import { TwitterHashtag } from 'integrations/twitter/twitterHashtag';
import * as _ from 'lodash';

import dotenv from 'dotenv';
dotenv.config();

describe('Twitter', () => {
  describe.skip('外部ネットワークへの接続なため必要なとき以外はテストをしない', () => {
    const client = new Client();
    let params: TwitterParams;

    beforeEach(() => {
      params = new TwitterParams();
      params.addHashTag(
        new TwitterHashtag()
          .initialize('星月芽依')
          .addString('Marvelouspro', TwitterQueryOperator.AND)
      );

      params.addHashTag(
        new TwitterHashtag().initialize('AZM').addString('STARDOM', TwitterQueryOperator.AND)
      );
    });

    describe('Pictureの画像を取得する場合', () => {
      beforeEach(() => {
        params.addFilter(TwitterFiliter.IMAGES);
      });

      it('TypeがPictureのものみ返すこと', async () => {
        const tweets = await client.search(params);
        const textOnly = _.filter(tweets, (tweet: TTweetBase) => {
          return tweet.type === TweetType.TextOnly;
        });
        expect(textOnly.length).toEqual(0);

        const picture = _.filter(tweets, (tweet: TTweetBase) => {
          return tweet.type === TweetType.Picture;
        });

        expect(picture.length).not.toEqual(0);
      });
    });

    describe('すべてのタイプを取得する場合', () => {
      it('TypeがPictureのものみ返すこと', async () => {
        const tweets = await client.search(params);

        const textOnly = _.filter(tweets, (tweet: TTweetBase) => {
          return tweet.type === TweetType.TextOnly;
        });
        expect(textOnly.length).not.toEqual(0);

        const picture = _.filter(tweets, (tweet: TTweetBase) => {
          return tweet.type === TweetType.Picture;
        });

        expect(picture.length).not.toEqual(0);
      });
    });
  });
});

export {};
