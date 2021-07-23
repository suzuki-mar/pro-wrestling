export interface IWrestlerRepository {
  fetchAll(): Promise<IWrestler[]>;
  addList(names: TWrestlerName[]): Promise<IWrestler[]>;
}

export interface IPromoterRepository {
  featchAll(): Promise<IPromoter[]>;
}
