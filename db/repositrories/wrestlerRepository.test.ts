import { WrestlerRepository } from 'db/repositrories/wrestlerRepository';
import { ContextCreator } from 'test/contextCreator';
import { Wrestler } from 'app/sub_contexts/wreslter/wrestler';
import { dbClose } from 'test/lib';

describe('WrestlerRepository', () => {
  beforeAll(async () => {
    await ContextCreator.createContextInWrestlerExists();
  });

  describe('fetchAll', () => {
    it('レスラーが返されていること', async (done) => {
      const repository = new WrestlerRepository();
      const wrestlers = await repository.fetchAll();

      expect(wrestlers.length).toEqual(1);
      const wrestler: Wrestler = wrestlers[0] as Wrestler;

      expect(wrestler.name).not.toBeUndefined();
      await dbClose(done);
    });
  });
});
export {};
