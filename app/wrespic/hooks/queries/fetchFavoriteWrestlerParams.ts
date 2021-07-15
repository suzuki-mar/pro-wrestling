import { Ctx } from 'blitz';
import { FavoriteWrestlers } from 'app/wrespic/models/favoriteWrestlers';
import { WrestlerParam } from 'app/core/wreslter';

export default async function fetchFavoriteWrestlerParams(
  _ = null,
  { session }: Ctx
): Promise<WrestlerParam[]> {
  const favoriteWrestlers = new FavoriteWrestlers();
  await favoriteWrestlers.build();

  return favoriteWrestlers.wrestlers().map((wrestler) => {
    return { name: wrestler.name, id: wrestler.id };
  });
}
