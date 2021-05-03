import { Source } from '../contents/interface';

export interface Wrestler {
  readonly name: string;
  isPerforming(source: Source): Boolean;
}

export interface WrestlerRepository {
  fetchWrestlers(): Promise<Wrestler[] | null>;
  saveWreslers(wreslers: Wrestler[]): Promise<Boolean>;
}
