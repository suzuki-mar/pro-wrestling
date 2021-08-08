import { IWrestler, TWrestlerName, TPromoterName } from 'app/wreslters';
import { Promoter } from 'app/wreslters/domains/models/promoter';
import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import { WrestlerName } from './wrestlerName';

export class Wrestler implements IWrestler {
  readonly currentBelongsPromoterName: TPromoterName;

  constructor(readonly id: number, readonly name: TWrestlerName) {
    //FIX MVP時はMarvelousしか対応させない
    this.currentBelongsPromoterName = Promoter.buildMarvelous().name;
  }

  static build(id: number, name: TWrestlerName): IWrestler {
    return new this(id, name);
  }

  equal(wrestler: IWrestler): boolean {
    const name = this.name as WrestlerName;
    const compare = wrestler.name as WrestlerName;
    return name.equal(compare);
  }

  static async creates(names: TWrestlerName[]): Promise<IWrestler[]> {
    const repository = RepositoryFactory.factoryWrestlerRepository();

    const promises = names.map((name) => {
      return repository.add(name);
    });

    return await Promise.all(promises);
  }
}
