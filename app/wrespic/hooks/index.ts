import getFavoriteWrestlers from '../queries/getFavoriteWrestlers';
import { useQuery } from 'blitz';
import { SelectedWrestlers } from '../entities/selectedWrestlers';
import { VFavoriteWrestlers } from '../view_models/favoriteWrestlers';
import { IFavoriteWrestlers } from '..';

export function useFavoriteWrestlers() {
  const [wrelsers] = useQuery(getFavoriteWrestlers, null);

  const favoriteWrestlers = new VFavoriteWrestlers();
  favoriteWrestlers.setUpWrestlers(wrelsers);
  return favoriteWrestlers as IFavoriteWrestlers;
}

export function useSelectedWrestlers() {
  return new SelectedWrestlers();
}
