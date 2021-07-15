export interface TWrestlerName {
  readonly full: string;
  equal(IWrestlerName): boolean;
}

export type TPromoterName = {
  readonly shortName: string;
};

export interface IWrestler {
  readonly id: number;
  readonly name: TWrestlerName;
  readonly currentBelongsPromoterName: TPromoterName;
  equal(IWrestler): boolean;
}

export interface IPromoter {
  readonly name: TPromoterName;
  readonly hashtag: string;
  isBelongTo(wreslerName: TWrestlerName): boolean;
}

export interface IWrestlerRepository {
  fetchAll(): Promise<IWrestler[]>;
  addList(names: TWrestlerName[]): Promise<IWrestler[]>;
}

export interface IPromoterRepository {
  featchAll(): Promise<IPromoter[]>;
}

export type WrestlerParam = {
  name: TWrestlerName;
  id: number;
};
