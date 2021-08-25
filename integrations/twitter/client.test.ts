import { Client } from 'integrations/twitter/client';
import {
  TwitterMediaType,
  TPictureTweet,
  ITwitterHashtagQuery,
  ITwitterParams,
  ITwitterQuery,
} from 'integrations/twitter';
import { TwitterParams } from 'integrations/twitter/params/twitterParams';
import { TweetFilter } from 'integrations/twitter/tweetFilter';
import { SampleData } from 'sampleData';

import dotenv from 'dotenv';
import { TwitterID } from './twitterID';
import { TwitterParameterFactory } from './twitterParameterFactory';
dotenv.config();

// searchメソッドのテストは別途 client_search.test記述してある

// 外部APIとの接続になるため必要最小限の実行にしている
const client = new Client();

describe('multisearch', () => {
  let params: TwitterParams;
  let args: (ITwitterQuery | TwitterID[])[] = [];

  beforeEach(() => {
    const wrestlerNames = [SampleData.meiName(), SampleData.mioName()];

    wrestlerNames.forEach((name) => {
      params = new TwitterParams();
      const query = TwitterParameterFactory.createQuery(name.full);
      args = [...args, query];
    });
  });

  it('複数のパラメーターのものを返すこと', async () => {
    const targetIds = [
      TwitterID.build('1419646898781097989'),
      TwitterID.build('1368182865599459328'),
      TwitterID.build('1420592812462985218'),
    ];

    args = [...args, targetIds];

    const tweets = await client.multisearch(args, params);
    expect(tweets).not.toBeUndefined();
  });
});

// TODO テストコードではなくスクリプトとして実行できるようにする
describe('指定の選手の写真URLを取得するスクリプト代わり', () => {
  describe.skip('スクリプトとして実行するとき以外はskip', () => {
    const wrestlerName = '彩羽匠';
    const promoterName = 'Marvelouspro';
    const client = new Client();
    let params: ITwitterParams;
    let query: ITwitterHashtagQuery;

    beforeEach(() => {
      params = new TwitterParams();
      params.setCount(30);
      params.setMediaType(TwitterMediaType.IMAGES);
      query = TwitterParameterFactory.createQuery(wrestlerName).addHashtag(promoterName);
    });

    it('TypeがPictureのものみ返すこと', async () => {
      const tweets = await client.search(query, params);
      const pictures: TPictureTweet[] = TweetFilter.filterPictures(tweets);
      let urls: string[] = [];

      pictures.forEach((picture: TPictureTweet) => {
        picture.items.forEach((item) => {
          urls = [...urls, item.pictureOriginalURL];
        });
      });
    });
  });
});

export {};
