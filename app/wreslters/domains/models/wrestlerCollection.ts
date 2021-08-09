import { IWrestler, TWrestlerName, IWrestlerCollection } from 'app/wreslters';
import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import * as _ from 'loadsh';
import { SampleData } from 'sampleData';
import { Wrestler } from './wrestler';

export class WrestlerCollection implements IWrestlerCollection {
  protected _wrestlers: IWrestler[] = [];

  async load(): Promise<void> {
    const repository = RepositoryFactory.factoryWrestlerRepository();
    const wrestlers: Wrestler[] = await repository.fetchAll();

    // FIX　SampleData以外のデータを使用する
    SampleData.wrestlerNames().forEach((name) => {
      const wresler = wrestlers.find((w) => {
        return name.equal(w.name);
      });

      if (wresler === undefined) {
        return;
      }

      this._wrestlers = [...this._wrestlers, wresler];
    });
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
