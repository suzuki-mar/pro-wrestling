import { IWrestler, TWrestlerName, TPromoterName } from 'app/core/wreslter';
import { Promoter } from 'app/core/wreslter/promoter';
import { RepositoryFactory } from 'db/repositrories/repositoryFactory';

export class Wrestler implements IWrestler {
  readonly currentBelongsPromoterName: TPromoterName;

  constructor(readonly name: TWrestlerName) {
    //FIX MVP時はMarvelousしか対応させない
    this.currentBelongsPromoterName = Promoter.buildMarvelous().name;
  }

  static async creates(names: TWrestlerName[]) {
    const repository = RepositoryFactory.factoryWrestlerRepository();
    return repository.addList(names);
  }
}
