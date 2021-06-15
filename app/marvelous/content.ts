import { IWrestler } from 'app/core/wreslter/interface';
import { Source } from 'app/marvelous/source';
import { IContent } from 'app/marvelous/interface';

export class Content implements IContent {
  readonly source: Source;
  readonly performingWrestlers: IWrestler[];
}
