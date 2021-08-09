import { execute } from './buildQuery';
import MockDate from 'mockdate';
import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import prisma from 'db/index';
import { SampleData } from 'sampleData';
import { dbClose } from 'test/lib';
import { Wrestler } from 'app/wreslters/domains/models/wrestler';

describe('buildQuery', () => {
  beforeAll(async (done) => {
    MockDate.set('2021-07-16 21:00:00');
    RepositoryFactory.connectingToRealDB();
    await prisma.$reset();

    await Wrestler.creates(SampleData.wrestlerNames());
    dbClose(done);
  });
  afterAll(() => {
    MockDate.reset();
  });

  it('Queryを作成できること', async (done) => {
    const actual = await execute();

    expect(actual['彩羽匠']).toEqual(expect.arrayContaining(['(#彩羽匠) since:2021-06-01']));
    expect(actual['星月芽依']).toEqual(
      expect.arrayContaining(['(#星月芽依) since:2021-07-19 until:2021-07-22'])
    );
    expect(actual['Maria']).toEqual(
      expect.arrayContaining(['(#Maria #Marvelouspro) since:2021-06-01'])
    );

    dbClose(done);
  });
});
