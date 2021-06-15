import { IFavoriteWrestlers } from 'app/wrespic/components/interface';
import { IWrestler } from 'app/sub_contexts/wreslter/interface';
import { RepositoryFactory } from 'db/repositrories/repositoryFactory';

export class FavoriteWrestlers implements IFavoriteWrestlers {
  async wrestlers(): Promise<IWrestler[]> {
    const repository = RepositoryFactory.factoryWrestlerRepository();
    return repository.fetchAll();
  }
}
