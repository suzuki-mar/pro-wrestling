export type WrestlerName = {
  readonly full: string;
};

export interface IWrestler {
  readonly name: WrestlerName;
}

export interface IWrestlerRepository {
  fetchAll(): Promise<IWrestler[]>;
  addList(names: WrestlerName[]): Promise<IWrestler[]>;
}
