import { Ctx } from 'blitz';
import { FavoriteWrestlers } from 'app/wrespic/domain/favoriteWrestlers';
import { IFavoriteWrestlers } from 'app/wrespic';

export default async function fetchFavoriteWrestlers(
  _ = null,
  { session }: Ctx
): Promise<IFavoriteWrestlers> {
  const favoriteWrestlers = new FavoriteWrestlers();
  await favoriteWrestlers.build();

  return favoriteWrestlers;
}
