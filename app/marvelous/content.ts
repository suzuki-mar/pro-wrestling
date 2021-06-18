import { IWrestler } from 'app/core/wreslter';
import { Source } from 'app/marvelous/source';
import { IContent } from 'app/marvelous';

export class Content implements IContent {
  readonly source: Source;
  readonly performingWrestlers: IWrestler[];
}
