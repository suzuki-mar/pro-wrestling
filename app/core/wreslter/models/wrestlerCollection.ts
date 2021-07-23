import { IWrestler, TWrestlerName, IWrestlerCollection } from 'app/core/wreslter';
import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import * as _ from 'loadsh';

export class WrestlerCollection implements IWrestlerCollection {
  protected _wrestlers: IWrestler[] = [];

  async load(): Promise<void> {
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

  static rebuild(wrestlers: IWrestler[]): IWrestlerCollection {
    const collection = new WrestlerCollection();
    collection._wrestlers = wrestlers;

    return collection;
  }
}
