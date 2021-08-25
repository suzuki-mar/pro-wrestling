import { TwitterMediaType } from 'integrations/twitter';
import { TwitterQuery } from 'integrations/twitter/queries/twitterQuery';

// アブストラクトのクラスをテストするため
class TwitterQueryForTest extends TwitterQuery {
  buildQueryByType(): string {
    return '';
  }
}

describe('toQuery', () => {
  let query: TwitterQuery;
  beforeEach(() => {
    query = new TwitterQueryForTest();
  });

  describe('ハッシュタグの設定', () => {
    describe('メディアーの設定', () => {
      it('メディアが正しく設定されていること', () => {
        query.setMediaType(TwitterMediaType.IMAGES);
        expect(query.toQuery()).toMatch('has:images');
      });
    });

    describe('RTが含まれているものを取得する', () => {
      it('指定が正しくされていること', () => {
        query.setIncldueRT();
        expect(query.toQuery()).not.toMatch('-is:retweet');
      });
    });
  });
});

export {};
