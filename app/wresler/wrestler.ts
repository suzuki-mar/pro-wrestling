import { Wrestler as WreslerIF } from './interface';
import { Source } from '../contents/interface';

export class Wrestler implements WreslerIF {
  readonly name: string;
  constructor(name: string) {
    this.name = name;
  }

  isPerforming(source: Source): Boolean {
    return source.title.includes(source.title);
  }
}
