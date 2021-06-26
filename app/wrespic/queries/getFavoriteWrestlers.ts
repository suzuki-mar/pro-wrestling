import { FavoriteWrestlers } from '../entities/favoriteWrestlers';
import { IFavoriteWrestlers } from '../';
import { Ctx } from 'blitz';

export default async function getFavoriteWrestlers(
  _ = null,
  { session }: Ctx
): Promise<IFavoriteWrestlers> {
  const favoriteWrestlers = new FavoriteWrestlers();
  await favoriteWrestlers.load();

  return favoriteWrestlers;
}
