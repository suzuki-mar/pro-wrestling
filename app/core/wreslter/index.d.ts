export type TWrestlerName = {
  readonly full: string;
};

export type TPromoterName = {
  readonly shortName: string;
};

export interface IWrestler {
  readonly name: TWrestlerName;
  readonly currentBelongsPromoterName: TPromoterName;
}

export interface IPromoter {
  readonly name: TPromoterName;
  readonly hashtag: string;
}

export interface IWrestlerRepository {
  fetchAll(): Promise<IWrestler[]>;
  addList(names: TWrestlerName[]): Promise<IWrestler[]>;
}

export interface IPromoterRepository {
  featchAll(): Promise<IPromoter[]>;
}
