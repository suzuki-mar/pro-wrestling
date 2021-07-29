import { WrestlerCollection } from 'app/core/wreslter/models/wrestlerCollection';
import { IWrestlerCollection } from 'app/core/wreslter';

export default async function fetchWrestlerCollection(): Promise<IWrestlerCollection> {
  const collection = new WrestlerCollection();
  await collection.load();

  return collection;
}
