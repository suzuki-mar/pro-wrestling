import { Client } from 'integrations/twitter/client';
import {
  TwitterQueryOperator,
  TwitterFiliter,
  TPictureTweet,
} from 'integrations/twitter/interface';
import { TwitterParams } from 'integrations/twitter/params';
import { TwitterHashtag } from 'integrations/twitter/twitterHashtag';
import { TweetFilter } from 'integrations/twitter/tweetFilter';

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
        new TwitterHashtag()
          .initialize('桃野美桜')
          .addString('Marvelouspro', TwitterQueryOperator.AND)
      );
    });

    describe('Pictureの画像を取得する場合', () => {
      beforeEach(() => {
        params = new TwitterParams();
        params.addFilter(TwitterFiliter.IMAGES);
      });

      it('TypeがPictureのものみ返すこと', async () => {
        const tweets = await client.search(params);
        const textOnlys = TweetFilter.filterTextOnlys(tweets);
        expect(textOnlys.length).toEqual(0);

        const pictures: TPictureTweet[] = TweetFilter.filterPictures(tweets);
        expect(pictures.length).not.toEqual(0);
      });
    });

    describe('すべてのタイプを取得する場合', () => {
      it('TypeがPictureのものみ返すこと', async () => {
        const tweets = await client.search(params);

        const textOnly = TweetFilter.filterTextOnlys(tweets);
        expect(textOnly.length).not.toEqual(0);

        const picture = TweetFilter.filterPictures(tweets);
        expect(picture.length).not.toEqual(0);
      });
    });

    describe('RTを含める場合', () => {
      beforeEach(() => {
        params.setIncldueRT();
      });

      it('RTの画像も返されていること', async () => {
        const tweets = await client.search(params);

        const rtweets = TweetFilter.filterRtweets(tweets);
        expect(rtweets.length).not.toEqual(0);
      });
    });
  });
});

// TODO テストコードではなくスクリプトとして実行できるようにする
describe('指定の選手の写真URLを取得するスクリプト代わり', () => {
  describe('スクリプトとして実行するとき以外はskip', () => {
    const wrestlerName = '彩羽匠';
    const promoterName = 'Marvelouspro';
    const client = new Client();
    let params: TwitterParams;

    beforeEach(() => {
      params = new TwitterParams();
      params.addCount(30);
      params.addHashTag(
        new TwitterHashtag()
          .initialize(wrestlerName)
          .addString(promoterName, TwitterQueryOperator.AND)
      );
      params.addFilter(TwitterFiliter.TWIMG);
    });

    it('TypeがPictureのものみ返すこと', async () => {
      const tweets = await client.search(params);
      const pictures: TPictureTweet[] = TweetFilter.filterPictures(tweets);
      const urls = pictures.map((picture: TPictureTweet) => {
        return picture.pictureURL;
      });

      console.log(urls);
    });
  });
});

export {};
