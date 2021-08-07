import { WrestlerCollection } from 'app/wreslters/domains/models/wrestlerCollection';
import fetchWrestlerCollection from './fetchWrestlerCollection';

it('レスラーコレクションを取得すること', async () => {
  const wrestlerCollection = await fetchWrestlerCollection();
  expect(wrestlerCollection).toBeInstanceOf(WrestlerCollection);
});
