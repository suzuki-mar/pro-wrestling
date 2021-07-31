import { TwitterQuery } from 'integrations/twitter/twitterQuery';
import { TwitterParams } from 'integrations/twitter/twitterParams';
import { SearchExecutor } from 'integrations/twitter/searchExecutor';
import { TwitterMediaType } from 'integrations/twitter';
import { SampleData } from 'sampleData';

import dotenv from 'dotenv';
import { TwitterID } from './twitterID';
dotenv.config();

describe('SearchExecutor', () => {
  let params: TwitterParams;

  beforeEach(async (done) => {
    params = new TwitterParams();
    done();
  });

  describe('ハッシュタグでのサーチ', () => {
    let query: TwitterQuery;

    beforeEach(async (done) => {
      params.setMediaType(TwitterMediaType.IMAGES);

      query = new TwitterQuery(SampleData.wrestlerName().full);
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

  describe('検索できなかった場合の処理', () => {
    let query: TwitterQuery;

    beforeEach(async (done) => {
      params.setMediaType(TwitterMediaType.IMAGES);

      query = new TwitterQuery(SampleData.unknownName().full);
      query.setMediaType(TwitterMediaType.IMAGES);
      done();
    });

    it('エラーにならないこと', async () => {
      const searchExecutor = new SearchExecutor(params);
      expect(async () => await searchExecutor.executeFromQeuery(query)).not.toThrow();
    });
  });

  describe('IDでのサーチ', () => {
    it('メディアなしでのサーチ', async () => {
      params.setMediaType(TwitterMediaType.IMAGES);

      const targetIds = [
        TwitterID.build('1419646898781097989'),
        TwitterID.build('1368182865599459328'),
        TwitterID.build('1420592812462985218'),
      ];

      const searchExecutor = new SearchExecutor(params);
      const resultItems = await searchExecutor.executeFromIds(targetIds);

      const exists = targetIds.some((id) => {
        return id.equal(resultItems![0]!.id);
      });

      expect(exists).toBeTruthy();
    });
  });
});
