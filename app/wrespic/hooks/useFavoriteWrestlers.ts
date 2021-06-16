import getFavoriteWrestlers from '../queries/getFavoriteWrestlers';
import { useQuery } from 'blitz';

export default function useFavoriteWrestlers() {
  const [wrelsers] = useQuery(getFavoriteWrestlers, null);
  return wrelsers;
}
