import { Wrestler } from 'app/wreslters/domains/models/wrestler';
import prisma from 'db';
import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import { SampleData } from 'sampleData';
import { dbClose } from 'test/lib';

describe('Wrestler', () => {
  describe('creates', () => {
    beforeEach(async (done) => {
      RepositoryFactory.connectingToRealDB();
      await prisma.$reset();
      dbClose(done);
    });

    it('作成できていること', async (done) => {
      const names = SampleData.wrestlerNames();
      const wrestlers = await Wrestler.creates(names);

      expect(wrestlers[0]).toBeInstanceOf(Wrestler);
      dbClose(done);
    });
  });

  describe('build', () => {
    it('作成できていること', async () => {
      const name = SampleData.meiName();
      const wrestler = Wrestler.build(0, name);
      expect(wrestler.name.equal(name)).toBeTruthy();
      expect(wrestler.currentBelongsPromoterName).not.toBeUndefined();
    });
  });
});
export {};
