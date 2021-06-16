import { createWrestlers } from './seeds';
import { Wrestler } from 'app/sub_contexts/wreslter/wrestler';
import { WrestlerRepository } from 'db/repositrories/wrestlerRepository';
import { TestData } from '../test/testData';
import * as _ from 'loadsh';
import { ContextCreator } from '../test/contextCreator';

describe('CreateWrestler', () => {
  beforeEach(async () => {
    await ContextCreator.resetAllData();
  });

  it('マーベラスのレスラーを作成すること', async () => {
    await createWrestlers();

    const repository = new WrestlerRepository();
    const wrestlers = await repository.fetchAll();

    expect(wrestlers.length).toEqual(TestData.marvelousWrestlerNames().length);
  });
});

export {};
