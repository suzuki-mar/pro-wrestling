import { Ctx } from 'blitz';
import { IWrestler } from 'app/core/wreslter';
import { FavoriteWrestlers } from 'app/wrespic/entities/favoriteWrestlers';

export default async function getFavoriteWrestlers(
  _ = null,
  { session }: Ctx
): Promise<IWrestler[]> {
  const favoriteWrestlers = new FavoriteWrestlers();
  await favoriteWrestlers.load();

  return favoriteWrestlers.wrestlers();
}
