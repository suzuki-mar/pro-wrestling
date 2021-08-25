import { TwitterHashtagQuery } from 'integrations/twitter/queries/twitterHashtagQuery';

describe('toQuery', () => {
  let query: TwitterHashtagQuery;
  beforeEach(() => {
    query = new TwitterHashtagQuery('Hoge');
  });

  describe('ハッシュタグの設定', () => {
    it('デフォルトの設定も踏まえて正しく設定できていること', () => {
      query.addHashtag('Fuga');

      expect(query.toQuery()).toMatch('#Hoge #Fuga has:hashtags -is:retweet');
    });
  });
});

export {};
