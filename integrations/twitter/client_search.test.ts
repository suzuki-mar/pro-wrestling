import { Client } from 'integrations/twitter/client';
import {
  TwitterMediaType,
  TPictureTweet,
  ITwitterParams,
  ITwitterQuery,
} from 'integrations/twitter';
import { TwitterParams } from 'integrations/twitter/params/twitterParams';
import { TweetFilter } from 'integrations/twitter/tweetFilter';

import dotenv from 'dotenv';
import { SampleData } from 'sampleData';
import faker from 'faker';
import { TwitterID } from './twitterID';
import { TwitterParameterFactory } from './twitterParameterFactory';
dotenv.config();

// 外部APIとの接続になるため必要最小限の実行にしている

describe.skip('必要になるとき以外はSKIP', () => {
  const client = new Client();
  let params: ITwitterParams;
  let query: ITwitterQuery;

  beforeEach(async (done) => {
    params = new TwitterParams();
    done();
  });

  describe('Query検索でPictureの画像を取得する場合', () => {
    beforeEach(() => {
      params.setMediaType(TwitterMediaType.IMAGES);
      query = TwitterParameterFactory.createQuery(SampleData.mioName().full);
    });

    it('TypeがPictureのものみ返すこと', async () => {
      const tweets = await client.search(query, params);
      const textOnlys = TweetFilter.filterTextOnlys(tweets);
      expect(textOnlys.length).toEqual(0);

      const pictures: TPictureTweet[] = TweetFilter.filterPictures(tweets);
      expect(pictures.length).not.toEqual(0);
    });
  });

  describe('ID検索ですべてのタイプを取得する場合', () => {
    it.skip('テキストとして取得する テストが落ちてしまうためSKIPをしている #101のIssueで修正する', async () => {
      const targetId = TwitterID.build('1419646898781097989');
      const ids = [targetId];
      const tweets = await client.search(ids, params);
      expect(tweets[0]!.id.equal(targetId)).toBeTruthy();
    });
  });

  describe('RTを含める場合', () => {
    beforeEach(() => {
      query = TwitterParameterFactory.createQuery(SampleData.mioName().full);
      query = query.setIncldueRT();
      params = params.setCountMax();
    });

    it('RTのTweetも返されていること', async () => {
      const tweets = await client.search(query, params);

      const rtweets = TweetFilter.filterRtweets(tweets);
      expect(rtweets.length).not.toEqual(0);
    });

    describe('データを取得できなかった場合', () => {
      beforeEach(() => {
        params.setMediaType(TwitterMediaType.IMAGES);
        query = TwitterParameterFactory.createQuery(
          SampleData.unknownName().full + faker.random.alpha()
        );
      });

      it('エラーが発生しないこと', async () => {
        const tweets = await client.search(query, params);
        expect(tweets.length).toEqual(0);
      });
    });
  });
});

export {};
