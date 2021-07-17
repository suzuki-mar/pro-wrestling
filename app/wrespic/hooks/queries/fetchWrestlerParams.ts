import { Ctx } from 'blitz';
import { WrestlerCollection } from 'app/core/wreslter/wrestlerCollection';
import { WrestlerParam } from 'app/core/wreslter';

export default async function fetchWrestlerParams(
  _ = null,
  { session }: Ctx
): Promise<WrestlerParam[]> {
  const collection = new WrestlerCollection();
  await collection.load();

  return collection.wrestlers().map((wrestler) => {
    return { name: wrestler.name, id: wrestler.id };
  });
}
