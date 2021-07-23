import { createWrestlers } from './seeds';
import { WrestlerRepository } from 'app/core/wreslter/models/repositories/wrestlerRepository';
import { SampleData } from 'sampleData';
import prisma from 'db/index';
import { dbClose } from 'test/lib';

describe('CreateWrestler', () => {
  beforeEach(async () => {
    await prisma.$reset();
  });

  it('マーベラスのレスラーを作成すること', async (done) => {
    await createWrestlers();

    const repository = new WrestlerRepository();
    const wrestlers = await repository.fetchAll();

    expect(wrestlers.length).toEqual(SampleData.wrestlerNames().length);
    await dbClose(done);
  });
});

export {};
