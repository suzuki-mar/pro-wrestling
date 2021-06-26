import { IFavoriteWrestlers } from 'app/wrespic';
import { IWrestler } from 'app/core/wreslter';
import { RepositoryFactory } from 'db/repositrories/repositoryFactory';

export class FavoriteWrestlers implements IFavoriteWrestlers {
  protected _wrestlers: IWrestler[] = [];

  async load(): Promise<void> {
    const repository = RepositoryFactory.factoryWrestlerRepository();
    this._wrestlers = await repository.fetchAll();
  }

  wrestlers(): IWrestler[] {
    return this._wrestlers;
  }
}
