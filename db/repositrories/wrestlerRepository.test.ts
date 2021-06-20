import { WrestlerRepository } from 'db/repositrories/wrestlerRepository';
import { Wrestler } from 'app/core/wreslter/wrestler';
import { dbClose } from 'test/lib';
import prisma from 'db/index';
import { SampleData } from 'sampleData';

describe('WrestlerRepository', () => {
  beforeEach(async () => {
    await prisma.$reset();
  });

  describe('fetchAll', () => {
    beforeEach(async () => {
      await prisma.wrestler.create({
        data: { name: SampleData.wrestlerName().full },
      });
    });

    it('レスラーが返されていること', async (done) => {
      const repository = new WrestlerRepository();
      const wrestlers = await repository.fetchAll();

      expect(wrestlers.length).toEqual(1);
      const wrestler: Wrestler = wrestlers[0] as Wrestler;

      expect(wrestler.name).not.toBeUndefined();
      await dbClose(done);
    });
  });

  describe('addList', () => {
    it('レスラーが作成されること', async (done) => {
      const repository = new WrestlerRepository();
      await repository.addList(SampleData.wrestlerNames());

      const wrestlers = await repository.fetchAll();
      expect(wrestlers.length).toEqual(SampleData.wrestlerNames().length);
      await dbClose(done);
    });
  });
});
export {};
