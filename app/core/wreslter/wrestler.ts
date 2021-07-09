import { IWrestler, IWrestlerName, TPromoterName } from 'app/core/wreslter';
import { Promoter } from 'app/core/wreslter/promoter';
import { RepositoryFactory } from 'db/repositrories/repositoryFactory';
import { WrestlerName } from './wrestlerName';

export class Wrestler implements IWrestler {
  readonly currentBelongsPromoterName: TPromoterName;
  readonly id: number | undefined;

  constructor(readonly name: IWrestlerName) {
    //FIX MVP時はMarvelousしか対応させない
    this.currentBelongsPromoterName = Promoter.buildMarvelous().name;
    this.id = name.id;
  }

  equal(wrestler: IWrestler): boolean {
    const name = this.name as WrestlerName;
    const compare = wrestler.name as WrestlerName;
    return name.equal(compare);
  }

  static async creates(names: IWrestlerName[]) {
    const repository = RepositoryFactory.factoryWrestlerRepository();
    return repository.addList(names);
  }
}
