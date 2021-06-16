import { FavoriteWrestlers } from '../entities/favoriteWrestlers';
import { Ctx, useQuery } from 'blitz';

export default async function getFavoriteWrestlers(_ = null, { session }: Ctx) {
  const favoriteWrestlers = new FavoriteWrestlers();
  const wrestlers = favoriteWrestlers.wrestlers();
  return wrestlers;
}
