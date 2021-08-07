import { WrestlerCollection } from 'app/wreslters/domains/models/wrestlerCollection';
import { IWrestlerCollection } from 'app/wreslters';

export default async function fetchWrestlerCollection(): Promise<IWrestlerCollection> {
  const collection = new WrestlerCollection();
  await collection.load();

  return collection;
}
