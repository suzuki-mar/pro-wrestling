import { WrestlerRepository } from './wrestlerRepository';
import { ContextCreator } from '../../test/contextCreator';
import { Wrestler } from 'app/sub_contexts/wreslter/wrestler';

describe('WrestlerRepository', () => {
  beforeEach(async () => {
    await ContextCreator.createContextInWrestlerExists();
  });

  describe('fetchAll', () => {
    it('レスラーが返されていること', async () => {
      const repository = new WrestlerRepository();
      const wrestlers = await repository.fetchAll();

      expect(wrestlers.length).toEqual(1);
      const wrestler: Wrestler = wrestlers[0] as Wrestler;

      expect(wrestler.name).not.toBeUndefined();
    });
  });
});
export {};
