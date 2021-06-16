import { IWrestler } from 'app/core/wreslter/interface';
import { RepositoryFactory } from 'db/repositrories/repositoryFactory';

export class Wrestler implements IWrestler {
  constructor(readonly name: string) {}

  static async creates(names: string[]) {
    const repository = RepositoryFactory.factoryWrestlerRepository();
    return repository.addList(names);
  }
}
