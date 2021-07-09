import { IFavoriteWrestlers } from 'app/wrespic';
import { IWrestler, IWrestlerName } from 'app/core/wreslter';
import { RepositoryFactory } from 'db/repositrories/repositoryFactory';
import * as _ from 'loadsh';

export class FavoriteWrestlers implements IFavoriteWrestlers {
  protected _wrestlers: IWrestler[] = [];

  static build(wrestlers: IWrestler[]): IFavoriteWrestlers {
    const fw = new this();
    fw._wrestlers = wrestlers;
    return fw;
  }

  async build(): Promise<void> {
    const repository = RepositoryFactory.factoryWrestlerRepository();
    this._wrestlers = await repository.fetchAll();
  }

  wrestlers(): IWrestler[] {
    return this._wrestlers;
  }

  sortById(): void {
    this._wrestlers = _.sortBy(this._wrestlers!, ['id']);
  }

  names(): IWrestlerName[] {
    return this._wrestlers.map((wrestler) => {
      return wrestler.name;
    });
  }
}
