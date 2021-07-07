export interface IWrestlerName {
  readonly full: string;
  equal(IWrestlerName): boolean;
}

export type TPromoterName = {
  readonly shortName: string;
};

export interface IWrestler {
  readonly name: IWrestlerName;
  readonly currentBelongsPromoterName: TPromoterName;
  equal(IWrestler): boolean;
}

export interface IPromoter {
  readonly name: TPromoterName;
  readonly hashtag: string;
  isBelongTo(wreslerName: IWrestlerName): boolean;
}

export interface IWrestlerRepository {
  fetchAll(): Promise<IWrestler[]>;
  addList(names: IWrestlerName[]): Promise<IWrestler[]>;
}

export interface IPromoterRepository {
  featchAll(): Promise<IPromoter[]>;
}
