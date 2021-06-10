import { WrestlerRepository } from './wrestlerRepository';
import { ContextCreator } from '../../test/contextCreator';

describe('WrestlerRepository', () => {
  beforeEach(async () => {
    await ContextCreator.createContextInWrestlerExists();
  });

  describe('fetchAll', () => {
    it('レスラーが返されていること', async () => {
      const repository = new WrestlerRepository();
      const wrestlers = await repository.fetchAll();

      expect(wrestlers[0].name()).not.toBeUndefined();
    });

    it('全件取得していること', async () => {
      const repository = new WrestlerRepository();
      const wrestlers = await repository.fetchAll();

      expect(wrestlers.length).toEqual(1);
    });
  });
});
export {};
