import { FavoriteWrestlers } from 'app/wrespic/domain/favoriteWrestlers';

describe('FavorteWrestlers', () => {
  describe('load ＆ wrestlers', () => {
    it('好きなレスラー一覧を取得すること', async () => {
      const favorteWrestlers = new FavoriteWrestlers();
      await favorteWrestlers.load();

      const wrestlers = favorteWrestlers.wrestlers();

      expect(wrestlers.length).not.toEqual(0);
    });
  });
});
export {};
