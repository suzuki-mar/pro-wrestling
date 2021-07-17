import { IWrestler, TWrestlerName, WrestlerParam, IWrestlerCollection } from 'app/core/wreslter';
import { RepositoryFactory } from 'db/repositrories/repositoryFactory';
import * as _ from 'loadsh';
import { Wrestler } from 'app/core/wreslter/wrestler';

export class WrestlerCollection implements IWrestlerCollection {
  protected _wrestlers: IWrestler[] = [];

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

  names(): TWrestlerName[] {
    return this._wrestlers.map((wrestler) => {
      return wrestler.name;
    });
  }

  rebuild(params: WrestlerParam[]) {
    this._wrestlers = params.map((param) => new Wrestler(param.name, param.id));
  }
}
