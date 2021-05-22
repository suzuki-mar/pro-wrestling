import { IWrestler } from './interface';
import { ISource } from '../contents/interface';
import * as Lib from '../core/lib';

export class Wrestler implements IWrestler {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }

  isPerforming(source: ISource): Boolean {
    return source.title.includes(this.name);
  }
}
