import { WrestlerRepository } from 'db/repositrories/wrestlerRepository';
import { Wrestler } from 'app/core/wreslter/wrestler';
import { dbClose } from 'test/lib';
import prisma from 'db/index';

describe('WrestlerRepository', () => {
  beforeAll(async () => {
    await prisma.$reset();
    await prisma.wrestler.create({
      data: { name: '桃野美桜' },
    });
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
