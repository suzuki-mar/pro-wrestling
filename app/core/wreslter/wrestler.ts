import { IWrestler, TWrestlerName, TPromoterName } from 'app/core/wreslter';
import { Promoter } from 'app/core/wreslter/promoter';
import { RepositoryFactory } from 'db/repositrories/repositoryFactory';
import { WrestlerName } from './wrestlerName';

export class Wrestler implements IWrestler {
  readonly currentBelongsPromoterName: TPromoterName;

  constructor(readonly name: TWrestlerName, readonly id: number) {
    //FIX MVP時はMarvelousしか対応させない
    this.currentBelongsPromoterName = Promoter.buildMarvelous().name;
  }

  equal(wrestler: IWrestler): boolean {
    const name = this.name as WrestlerName;
    const compare = wrestler.name as WrestlerName;
    return name.equal(compare);
  }

  static async creates(names: TWrestlerName[]) {
    const repository = RepositoryFactory.factoryWrestlerRepository();
    return repository.addList(names);
  }
}
