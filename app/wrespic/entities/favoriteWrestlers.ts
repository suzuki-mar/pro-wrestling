import { IFavoriteWrestlers } from '../components/interface';
import { IWrestler } from '../../sub_contexts/wreslter/interface';
import { WrestlerRepository } from '../../../db/repositrories/wrestlerRepository';

export class FavoriteWrestlers implements IFavoriteWrestlers {
  async wrestlers(): Promise<IWrestler[]> {
    const repository = new WrestlerRepository();
    return repository.fetchAll();
  }
}
