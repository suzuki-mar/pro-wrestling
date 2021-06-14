import { FavoriteWrestlers } from './favoriteWrestlers';

describe('FavorteWrestlers', () => {
  describe('wrestlers', () => {
    it('好きなレスラー一覧を取得すること', async () => {
      const favorteWrestlers = new FavoriteWrestlers();
      const wrestlers = await favorteWrestlers.wrestlers();

      expect(wrestlers.length).not.toEqual(0);
    });
  });
});
export {};
