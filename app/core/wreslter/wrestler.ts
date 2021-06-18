import { IWrestler, TWrestlerName } from 'app/core/wreslter';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { RepositoryFactory } from 'db/repositrories/repositoryFactory';

export class Wrestler implements IWrestler {
  constructor(readonly name: WrestlerName) {}

  static async creates(names: TWrestlerName[]) {
    const repository = RepositoryFactory.factoryWrestlerRepository();
    return repository.addList(names);
  }
}
