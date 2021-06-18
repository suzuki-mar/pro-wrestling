export type TWrestlerName = {
  readonly full: string;
};

export interface IWrestler {
  readonly name: TWrestlerName;
}

export interface IWrestlerRepository {
  fetchAll(): Promise<IWrestler[]>;
  addList(names: TWrestlerName[]): Promise<IWrestler[]>;
}
