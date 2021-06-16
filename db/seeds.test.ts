import { createWrestlers } from './seeds';
import { WrestlerRepository } from 'db/repositrories/wrestlerRepository';
import { TestData } from 'test/testData';
import prisma from 'db/index';

describe('CreateWrestler', () => {
  beforeEach(async () => {
    await prisma.$reset();
    await prisma.wrestler.create({
      data: { name: TestData.marvelousWrestlerName() },
    });
  });

  it('マーベラスのレスラーを作成すること', async () => {
    await createWrestlers();

    const repository = new WrestlerRepository();
    const wrestlers = await repository.fetchAll();

    expect(wrestlers.length).toEqual(TestData.marvelousWrestlerNames().length);
  });
});

export {};
