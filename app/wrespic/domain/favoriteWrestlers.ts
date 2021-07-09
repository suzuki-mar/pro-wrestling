import { IFavoriteWrestlers } from 'app/wrespic';
import { IWrestler, IWrestlerName } from 'app/core/wreslter';
import { RepositoryFactory } from 'db/repositrories/repositoryFactory';

export class FavoriteWrestlers implements IFavoriteWrestlers {
  protected _wrestlers: IWrestler[] = [];

  static build(wrestlers: IWrestler[]): IFavoriteWrestlers {
    const fw = new this();
    fw._wrestlers = wrestlers;
    return fw;
  }

  async load(): Promise<void> {
    const repository = RepositoryFactory.factoryWrestlerRepository();
    this._wrestlers = await repository.fetchAll();
  }

  wrestlers(): IWrestler[] {
    return this._wrestlers;
  }

  names(): IWrestlerName[] {
    return this._wrestlers.map((wrestler) => {
      return wrestler.name;
    });
  }
}
