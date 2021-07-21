import { Client } from 'integrations/twitter/client';
import { TwitterQueryOperator, TwitterFiliter, TPictureTweet } from 'integrations/twitter';
import { TwitterParams } from 'integrations/twitter/params';
import { TwitterHashtag } from 'integrations/twitter/twitterHashtag';
import { TweetFilter } from 'integrations/twitter/tweetFilter';

import dotenv from 'dotenv';
import { SampleData } from 'sampleData';
dotenv.config();

// 外部APIとの接続になるため必要最小限の実行にしている
const client = new Client();
let params: TwitterParams = new TwitterParams();

describe('search', () => {
  describe('接続確認', () => {
    beforeEach(() => {
      params.addHashTag(new TwitterHashtag().initialize('Test'));
    });

    it('接続ができること', async () => {
      try {
        await client.search(params);
      } catch (error) {
        expect(false).toBeTruthy();
      }
    });
  });

  describe.skip('Pictureの画像を取得する場合', () => {
    beforeEach(() => {
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

  describe.skip('すべてのタイプを取得する場合', () => {
    it('TypeがPictureのものみ返すこと', async () => {
      const tweets = await client.search(params);

      const textOnly = TweetFilter.filterTextOnlys(tweets);
      expect(textOnly.length).not.toEqual(0);

      const picture = TweetFilter.filterPictures(tweets);
      expect(picture.length).not.toEqual(0);
    });
  });

  describe.skip('RTを含める場合', () => {
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

describe.skip('multisearch', () => {
  let paramsList: TwitterParams[] = [];

  beforeEach(() => {
    const wrestlerNames = [SampleData.meiName(), SampleData.mioName()];

    wrestlerNames.forEach((name) => {
      const params = new TwitterParams();
      params.addHashTag(new TwitterHashtag().initialize(name.full));

      params.addCount(1);

      paramsList = [...paramsList, params];
    });
  });

  it('複数のパラメーターのものを返すこと', async () => {
    const tweets = await client.multisearch(paramsList);
    expect(tweets.length).toEqual(2);
  });
});

// TODO テストコードではなくスクリプトとして実行できるようにする
describe('指定の選手の写真URLを取得するスクリプト代わり', () => {
  describe.skip('スクリプトとして実行するとき以外はskip', () => {
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
