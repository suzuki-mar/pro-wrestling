import { Twitter, TwitterQuery, Tweet } from './twitter';

describe.skip('TwitterQuery', () => {
  describe('toString', () => {
    describe('値がセットされていない場合', () => {
      const query = new TwitterQuery();
      expect(query.toString()).toEqual('');
    });

    describe('ハッシュタグが1だけセットされている場合', () => {
      const query = new TwitterQuery();
      query.hastags.push('STARDOM');
      expect(query.toString()).toEqual('#STARDOM');
    });

    describe('ハッシュタグがセットされている場合', () => {
      const query = new TwitterQuery();
      query.hastags.push('STARDOM');
      query.hastags.push('中野たむ');
      expect(query.toString()).toEqual('(#STARDOM AND #中野たむ)');
    });
  });
});

describe('Twitter', () => {
  describe('外部ネットワークへの接続なため必要なとき以外はテストをしない', () => {
    const twitter = new Twitter();

    describe('search', () => {
      it('Tweetを取得できること', async () => {
        const query = new TwitterQuery();
        query.hastags.push('STARDOM');
        query.hastags.push('AZM');

        return twitter.search(query).then((tweets: Tweet[]) => {
          //no-unused-expressionsの警告がでるが見た目上問題ないため無効にしている
          //eslint-disable-next-line
          expect(tweets.length).toBeGreaterThan(9);
          expect(tweets[0].id).not.toBeNull();
          expect(tweets[0].text).not.toBeNull();
        });
      });
    });
  });
});

export {};
