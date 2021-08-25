import { TwitterHashtagQuery } from 'integrations/twitter/queries/twitterHashtagQuery';
import { TwitterUserIDQuery } from 'integrations/twitter/queries/twitterUserIDQuery';
import { TwitterParams } from 'integrations/twitter/twitterParams';
import { SearchExecutor } from 'integrations/twitter/searchExecutor';
import {
  ITwitterQuery,
  TTweetPictureURL,
  TTweetSiteURL,
  TUserID,
  TwitterMediaType,
} from 'integrations/twitter';
import { SampleData } from 'sampleData';
import dotenv from 'dotenv';
import { TwitterID } from './twitterID';
import { TwitterParameterFactory } from './twitterParameterFactory';
import moment from 'moment';
dotenv.config();

describe('SearchExecutor', () => {
  let params: TwitterParams;

  beforeEach(async (done) => {
    params = new TwitterParams();
    done();
  });

  describe('ハッシュタグでのサーチ', () => {
    let query: TwitterHashtagQuery;

    beforeEach(async (done) => {
      params.setMediaType(TwitterMediaType.IMAGES);
      params.setCountMax();

      query = new TwitterHashtagQuery(SampleData.wrestlerName().full);
      query.setMediaType(TwitterMediaType.IMAGES);
      done();
    });

    it('写真でのサーチ', async () => {
      const searchExecutor = new SearchExecutor(params);
      const resultItems = await searchExecutor.executeFromQeuery(query);

      const allExists = resultItems!.every((item) => {
        return item.photoURLs !== undefined;
      });

      expect(allExists).toBeTruthy();
      expect(resultItems![0]!.contributor.id).not.toBeUndefined();
    });
  });

  describe('UserIDでのサーチ', () => {
    let query: TwitterUserIDQuery;
    const userIDs: TUserID[] = [{ name: 'Mio0207415' }, { name: 'mei_marvelous' }];

    beforeEach(async (done) => {
      query = new TwitterUserIDQuery(userIDs[0]!);
      query.addUserID(userIDs[1]!);
      done();
    });

    it('サーチできること', async () => {
      const searchExecutor = new SearchExecutor(params);

      const resultItems = await searchExecutor.executeFromQeuery(query);

      const allExists = resultItems!.every((item) => {
        return (
          item.contributor.username === userIDs[0]!.name ||
          item.contributor.username === userIDs[1]!.name
        );
      });

      expect(allExists).toBeTruthy();
    });
  });

  describe('時間指定でのサーチ', () => {
    let query: TwitterHashtagQuery;
    let startTime: Date;

    beforeEach(async (done) => {
      startTime = moment(new Date()).add(-1, 'day').add(1, 'hours').toDate();

      params.setStartTime(startTime);

      query = new TwitterHashtagQuery(SampleData.meiName().full);
      done();
    });

    it('指定した期間のみ取得していること', async () => {
      const searchExecutor = new SearchExecutor(params);

      const resultItems = await searchExecutor.executeFromQeuery(query);
      // 前日にだれもつぶやいていない場合も考えられる
      if (resultItems!.length === 0) {
        expect(true).toBeTruthy();
      }

      const allValid = resultItems!.every((item) => {
        const itemDate = moment(item.tweeted_at);
        // 日をまたいだものがないこと
        return moment(startTime).diff(itemDate, 'days') === 0;
      });
      expect(allValid).toBeTruthy();
    });
  });

  describe('検索できなかった場合の処理', () => {
    let query: ITwitterQuery;

    beforeEach(async (done) => {
      params.setMediaType(TwitterMediaType.IMAGES);

      query = TwitterParameterFactory.createQuery(SampleData.unknownName().full);
      query.setMediaType(TwitterMediaType.IMAGES);
      done();
    });

    it('エラーにならないこと', async () => {
      const searchExecutor = new SearchExecutor(params);
      expect(async () => await searchExecutor.executeFromQeuery(query)).not.toThrow();
    });
  });

  describe('IDでのサーチ', () => {
    const targetIds = [
      // これだけ写真ではなくサイトのURLが設定されている
      TwitterID.build('1423842736369639434'),
      TwitterID.build('1368182865599459328'),
    ];

    it('メディアなしでのサーチ', async () => {
      params.setMediaType(TwitterMediaType.IMAGES);
      const searchExecutor = new SearchExecutor(params);
      const resultItems = await searchExecutor.executeFromIds(targetIds);

      const exists = targetIds.some((id) => {
        return id.equal(resultItems![0]!.id);
      });

      expect(exists).toBeTruthy();
    });

    it('URLが分類していること', async () => {
      const searchExecutor = new SearchExecutor(params);
      const resultItems = await searchExecutor.executeFromIds(targetIds);

      if (resultItems === undefined) {
        console.log('1件もデータの取得ができなかった');
        expect(false).toBeTruthy();
        return;
      }

      const siteTweetURL = resultItems[0]!.urls[0]! as TTweetSiteURL;
      expect(siteTweetURL.title).not.toBeUndefined();
      const pictureTweetURL = resultItems[1]!.urls[0]! as TTweetPictureURL;
      expect(pictureTweetURL.urlStr).not.toBeUndefined();
    });
  });
});
