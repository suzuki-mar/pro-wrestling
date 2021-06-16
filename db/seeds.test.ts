import { createWrestlers } from './seeds';
import { WrestlerRepository } from 'db/repositrories/wrestlerRepository';
import { SampleData } from 'db/sampleData';
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