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

export interface IWrestlerCollection {
  load(): Promise<void>;
  wrestlers(): IWrestler[];
  names(): TWrestlerName[];
  sortById(): void;
}
