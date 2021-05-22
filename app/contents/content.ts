import { Wrestler } from '../wresler/interface';
import { Source } from './source';
import { IContent } from './interface';

export class Content implements IContent {
  readonly source: Source;
  readonly performingWrestlers: Wrestler[];
}
