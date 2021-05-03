import { Wrestler } from '../wresler/interface';
import { Source } from './source';

export class Content {
  readonly source: Source;
  readonly performingWrestlers: Wrestler[];
}
