import { IWrestler, WrestlerName } from 'app/core/wreslter/interface';
import { RepositoryFactory } from 'db/repositrories/repositoryFactory';

export class Wrestler implements IWrestler {
  constructor(readonly name: WrestlerName) {}

  static async creates(names: WrestlerName[]) {
    const repository = RepositoryFactory.factoryWrestlerRepository();
    return repository.addList(names);
  }
}
