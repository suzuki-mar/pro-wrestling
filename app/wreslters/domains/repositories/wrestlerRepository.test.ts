import { WrestlerRepository } from './wrestlerRepository';
import { dbClose } from 'test/lib';
import prisma from 'db/index';
import { SampleData } from 'sampleData';
import { TWrestlerName } from 'app/wreslters';

describe('WrestlerRepository', () => {
  const repository = new WrestlerRepository();

  beforeEach(async () => {
    await prisma.$reset();
  });

  describe('fetchAll', () => {
    let names: TWrestlerName[];

    beforeEach(async () => {
      names = SampleData.wrestlerNames();
      await repository.add(names[0]!);
      await repository.add(names[1]!);
    });

    it('全レスラーが返されていること', async (done) => {
      const wrestlers = await repository.fetchAll();

      expect(wrestlers.length).toEqual(2);
      await dbClose(done);
    });
  });

  describe('add & fetchByName', () => {
    it('レスラーが作成されること', async (done) => {
      const name = SampleData.wrestlerName();

      await repository.add(name);
      const wrestler = await repository.fetchByName(name);
      expect(wrestler.name.equal(name)).toBeTruthy();
      await dbClose(done);
    });
  });
});
export {};
