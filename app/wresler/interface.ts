import { ISource } from '../contents/interface';

export interface IWrestler {
  readonly name: string;
  isPerforming(source: ISource): Boolean;
}

export interface IWrestlerRepository {
  fetchWrestlers(): Promise<IWrestler[] | null>;
  saveWreslers(wreslers: IWrestler[]): Promise<Boolean>;
}
