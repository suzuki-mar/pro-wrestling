import getFavoriteWrestlers from '../queries/getFavoriteWrestlers';
import { useQuery } from 'blitz';
import { SelectedWrestlers } from '../entities/selectedWrestlers';

export function useFavoriteWrestlers() {
  const [wrelsers] = useQuery(getFavoriteWrestlers, null);
  return wrelsers;
}

export function useSelectedWrestlers() {
  return new SelectedWrestlers([]);
}
