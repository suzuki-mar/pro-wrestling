export interface IWrestler {
  name(): string;
}

export interface IWrestlerRepository {
  fetchAll(): Promise<IWrestler[]>;
}
