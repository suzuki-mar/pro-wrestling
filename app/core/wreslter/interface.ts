export interface IWrestler {
  readonly name: string;
}

export interface IWrestlerRepository {
  fetchAll(): Promise<IWrestler[]>;
  addList(names: string[]): Promise<IWrestler[]>;
}
