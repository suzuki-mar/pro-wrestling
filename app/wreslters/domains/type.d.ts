import { TWrestlerName } from '..';

export interface IWrestlerRepository {
  fetchAll(): Promise<IWrestler[]>;
  add(name: TWrestlerName): Promise<IWrestler>;
  fetchByName(name: TWrestlerName): Promise<IWrestler>;
}

export interface IPromoterRepository {
  featchAll(): Promise<IPromoter[]>;
  featchByWrestlerName(name: TWrestlerName): Promise<IPromoter>;
}

export interface IWrestlerQuery {
  findNames(): Promise<TWrestlerName[]>;
}
