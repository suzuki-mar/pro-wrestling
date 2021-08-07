export interface TWrestlerName {
  readonly full: string;
  readonly unique: boolean;
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

export interface ISelectedWrestlers {
  names(): TWrestlerName[];
  isSelected(name: TWrestlerName): boolean;
  select(name: TWrestlerName): TWrestlerName[];
  deselect(name: TWrestlerName): TWrestlerName[];
  rebuild(names: TWrestlerName[]): void;
}

export type WrestlersAppState = {
  selectedWrestlers: ISelectedWrestlers;
  wrestlerCollection: IWrestlerCollection;
};
