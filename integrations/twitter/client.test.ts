import { Client } from 'integrations/twitter/client';
import { TwitterQueryOperator, TwitterFiliter, TPictureTweet } from 'integrations/twitter';
import { TwitterParams } from 'integrations/twitter/params';
import { TwitterHashtag } from 'integrations/twitter/twitterHashtag';
import { TweetFilter } from 'integrations/twitter/tweetFilter';

import dotenv from 'dotenv';
import { SampleData } from 'sampleData';
dotenv.config();

// searchメソッドのテストは別途 client_search.test記述してある

// 外部APIとの接続になるため必要最小限の実行にしている
const client = new Client();

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
      let urls: string[] = [];

      pictures.forEach((picture: TPictureTweet) => {
        picture.items.forEach((item) => {
          urls = [...urls, item.pictureURL];
        });
      });
      console.log(urls);
    });
  });
});

export {};
