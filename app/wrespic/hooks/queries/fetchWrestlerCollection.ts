import { WrestlerCollection } from 'app/core/wreslter/models/wrestlerCollection';
import { IWrestlerCollection } from 'app/core/wreslter';
import { Logger } from 'infrastructure/logger';

export default async function fetchWrestlerCollection(): Promise<IWrestlerCollection> {
  const collection = new WrestlerCollection();
  await collection.load();

  Logger.log(collection.wrestlers());

  return collection;
}
