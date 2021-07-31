import { TwitterMediaType } from 'integrations/twitter';
import { TwitterQuery } from 'integrations/twitter/twitterQuery';

describe('toQuery', () => {
  let query: TwitterQuery;
  beforeEach(() => {
    query = new TwitterQuery('Hoge');
  });

  describe('ハッシュタグの設定', () => {
    it('デフォルトの設定も踏まえて正しく設定できていること', () => {
      query.addHashtag('Fuga');

      expect(query.toQuery()).toMatch('(#Hoge #Fuga has:hashtags -is:retweet)');
    });
  });

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

export {};
