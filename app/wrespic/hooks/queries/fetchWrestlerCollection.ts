import { WrestlerCollection } from 'app/core/wreslter/models/wrestlerCollection';
import { IWrestlerCollection } from 'app/core/wreslter';
import { Infra } from 'infrastructure';

export default async function fetchWrestlerCollection(): Promise<IWrestlerCollection> {
  const collection = new WrestlerCollection();
  await collection.load();

  Infra.log(collection.wrestlers());

  return collection;
}
