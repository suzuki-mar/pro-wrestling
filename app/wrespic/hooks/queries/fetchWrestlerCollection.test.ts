import { WrestlerCollection } from 'app/core/wreslter/models/wrestlerCollection';
import fetchWrestlerCollection from './fetchWrestlerCollection';

it('レスラーコレクションを取得すること', async () => {
  const wrestlerCollection = await fetchWrestlerCollection();
  expect(wrestlerCollection).toBeInstanceOf(WrestlerCollection);
});
